package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"os"
)

func ReverseProxy() *httputil.ReverseProxy {
	director := func(req *http.Request) {
		req.URL.Scheme = "http"
		req.URL.Path = "/" + req.Host + req.URL.Path
		req.URL.Host = os.Getenv("HOST")
		req.Host = os.Getenv("HOST")
		fmt.Printf("http:/%s\n", req.URL.Path)
	}
	return &httputil.ReverseProxy{Director: director}
}

func main() {
	http.ListenAndServe(":8080", ReverseProxy())
}
