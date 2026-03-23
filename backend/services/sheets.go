package services

import (
	"context"
	"fmt"
	"log"
	"os"

	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

func AppendOrderToSheet(name, phone, wilaya, commune, productName string, date string) error {
	ctx := context.Background()
	credentialsFile := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")
	spreadsheetId := os.Getenv("SPREADSHEET_ID")
	
	if credentialsFile == "" || spreadsheetId == "" {
		log.Println("Google Sheets credentials not set. Skipping sheet update.")
		return nil
	}

	srv, err := sheets.NewService(ctx, option.WithCredentialsFile(credentialsFile))
	if err != nil {
		return fmt.Errorf("unable to retrieve Sheets client: %v", err)
	}

	readRange := "Sheet1!A:F"
	valueRange := &sheets.ValueRange{
		Values: [][]interface{}{
			{name, phone, wilaya, commune, productName, date},
		},
	}

	_, err = srv.Spreadsheets.Values.Append(spreadsheetId, readRange, valueRange).
		ValueInputOption("RAW").Do()
	if err != nil {
		return fmt.Errorf("unable to append data to sheet: %v", err)
	}

	return nil
}
