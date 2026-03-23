package models

// Product represents a watch in the store
type Product struct {
	ID       uint    `json:"id" gorm:"primaryKey"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	ImageURL string  `json:"image_url"`
}
