package database

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/vrmx-khadmoney/ecommerce-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Africa/Algiers",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Migrate schemas
	err = DB.AutoMigrate(&models.Product{}, &models.Order{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	fmt.Println("Database connection established and migrated successfully.")
}

// SeedProducts seeds the database
func SeedProducts() {
	var count int64
	DB.Model(&models.Product{}).Count(&count)
	if count == 0 {
		products := []models.Product{
			{Name: "ساعة كلاسيكية ذهبية", Price: 4500, ImageURL: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
			{Name: "ساعة رياضية سوداء", Price: 3200, ImageURL: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
			{Name: "ساعة ألماس فضية", Price: 8500, ImageURL: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
			{Name: "ساعة جلدية بنية", Price: 2900, ImageURL: "https://images.unsplash.com/photo-1508656919611-996ea57fb1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
		}
		for _, v := range products {
			DB.Create(&v)
		}
		fmt.Println("Products seeded successfully.")
	}
}
