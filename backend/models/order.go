package models

import "time"

// Order represents a customer order
type Order struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Phone     string    `json:"phone"`
	Wilaya    string    `json:"wilaya"`
	Commune   string    `json:"commune"`
	ProductID uint      `json:"product_id"`
	Quantity  int       `json:"quantity"`
	CreatedAt time.Time `json:"created_at"`
}
