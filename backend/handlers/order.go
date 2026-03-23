package handlers

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/vrmx-khadmoney/ecommerce-backend/database"
	"github.com/vrmx-khadmoney/ecommerce-backend/models"
	"github.com/vrmx-khadmoney/ecommerce-backend/services"
)

type CreateOrderInput struct {
	Name      string `json:"name" binding:"required"`
	Phone     string `json:"phone" binding:"required"`
	Wilaya    string `json:"wilaya" binding:"required"`
	Commune   string `json:"commune" binding:"required"`
	ProductID uint   `json:"product_id" binding:"required"`
	Quantity  int    `json:"quantity"`
}

func CreateOrder(c *gin.Context) {
	var input CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var product models.Product
	if err := database.DB.First(&product, input.ProductID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	qty := input.Quantity
	if qty <= 0 {
		qty = 1
	}

	order := models.Order{
		Name:      input.Name,
		Phone:     input.Phone,
		Wilaya:    input.Wilaya,
		Commune:   input.Commune,
		ProductID: input.ProductID,
		Quantity:  qty,
		CreatedAt: time.Now(),
	}

	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	// Send to Google Sheets asynchronously
	go func() {
		err := services.AppendOrderToSheet(
			order.Name,
			order.Phone,
			order.Wilaya,
			order.Commune,
			product.Name,
			order.CreatedAt.Format(time.RFC3339),
		)
		if err != nil {
			log.Printf("Failed to append order to Google Sheets: %v\n", err)
		}
	}()

	c.JSON(http.StatusCreated, gin.H{"message": "تم تأكيد طلبك، سنتصل بك قريباً", "order": order})
}
