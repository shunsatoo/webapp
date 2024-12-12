package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JsonRequest struct {
	Message string `json:"message"`
}

func main() {
	router := gin.Default()

	// Go -> React
	router.GET("/api", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "This message from Go api",
		})
	})

	// React -> Go
	router.POST("/api/message", func(ctx *gin.Context) {
		var jr JsonRequest
		if err := ctx.ShouldBindJSON(&jr); err != nil {
			fmt.Println("Error Occured")
		} else {
			fmt.Println(jr.Message)
		}
	})

	// http://localhost:8080
	router.Run()
}