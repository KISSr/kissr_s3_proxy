FROM golang:1.6-alpine
RUN apk add --no-cache git
ADD . /go/src/github.com/kissr/kissr-s3-proxy
RUN rm /go/src/github.com/kissr/kissr-s3-proxy/.env
RUN go get github.com/joho/godotenv
RUN go install github.com/kissr/kissr-s3-proxy
ENTRYPOINT /go/bin/kissr-s3-proxy
EXPOSE 8080
