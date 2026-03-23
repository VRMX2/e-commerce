package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vrmx-khadmoney/ecommerce-backend/database"
	"github.com/vrmx-khadmoney/ecommerce-backend/models"
)

func GetProducts(c *gin.Context) {
	var products []models.Product
	if err := database.DB.Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}
	c.JSON(http.StatusOK, products)
}
