package main

import (
	"fmt"
	"net/http"
	"time"
	"io"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// ここからCorsの設定
	r.Use(cors.New(cors.Config{
	  // アクセスを許可したいアクセス元
	  AllowOrigins: []string{
		  "http://localhost:3000",
	  },
	  // アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
	  AllowMethods: []string{
		  "POST",
		  "GET",
		  "OPTIONS",
	  },
	  // 許可したいHTTPリクエストヘッダ
	  AllowHeaders: []string{
		  "Access-Control-Allow-Credentials",
		  "Access-Control-Allow-Headers",
		  "Content-Type",
		  "Content-Length",
		  "Accept-Encoding",
		  "Authorization",
	  },
	  // cookieなどの情報を必要とするかどうか
	  AllowCredentials: true,
	  // preflightリクエストの結果をキャッシュする時間
	  MaxAge: 24 * time.Hour,
	}))

	// 情報セット
	r.GET("/api", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"languages" : "English",
			"moneys" : "＄",
			"publicdays" : "月初",
			"sites" : "翌月初",
			"cycles" : "2",
			"sendway" : "20",
			"code" : "00000000",
			"shares" : "1",
			"taxs" : "1",
		})
		fmt.Println("サイトに値を反映しました")
	})
	r.POST("/api/update", func(ctx *gin.Context) {
		body, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
		  println("エラー")
		}
		println(string(body))
	})
	// http://localhost:8080
	r.Run()
}