package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/vrmx-khadmoney/ecommerce-backend/database"
	"github.com/vrmx-khadmoney/ecommerce-backend/handlers"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using OS env variables")
	}

	database.ConnectDB()
	database.SeedProducts()

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	api := r.Group("/api")
	{
		api.GET("/products", handlers.GetProducts)
		api.POST("/orders", handlers.CreateOrder)
	}

	log.Println("Server running on port 8080")
	r.Run(":8080")
}
