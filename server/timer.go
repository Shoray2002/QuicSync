package server

import (
	"context"
	"time"
)


// Run a function every 10 seconds
func run(ctx context.Context, fn func()) {
	ticker := time.NewTicker(10 * time.Second)
	for {
		select {
			case <- ticker.C:
				fn()
			case <- ctx.Done():
				return
		}
	}
}
