package cmd

import (
	"context"

	"quicsync/client"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(sendCmd)
	sendCmd.Flags().StringP("share", "s", "", "share with a friend")
}

var sendCmd = &cobra.Command{
	Use:   "send",
	Short: "send <file>",
	Run: func(cmd *cobra.Command, args []string) {
		config := client.DefaultConfig
		loadConfig(config)

		if share, err := cmd.Flags().GetString("share"); err == nil {
			config.Server = share
		}

		cli, err := client.NewClient(config)
		if err != nil {
			panic(err)
		}
		cli.Send(context.Background(), args)
	},
}
