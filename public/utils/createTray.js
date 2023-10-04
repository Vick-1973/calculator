const { app, Tray, Menu, shell } = require("electron");
const { showNotification } = require("./showNotification");
const config = require("./config");

exports.createTray = () => {
	const t = new Tray(config.icon);

	t.setToolTip(config.appName);
	t.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: "Show App",
				click: () => {
					if (!config.mainWindow.isVisible())
						config.mainWindow.show();
				},
			},
			{
				label: "Creator",
				submenu: [
					{
						label: "GitHub",
						click: () => {
							shell.openExternal("https://github.com/arepo90");
						},
					},
					{
						label: "E-Mail",
						click: () => {
							shell.openExternal("mailto:Arepo90@proton.me");
						},
					},
					{
						label: "Website",
						click: () => {
							shell.openExternal("https://rotas-calculator.web.app");
						},
					},
				],
			},
			{
				label: "Quit",
				click: () => {
					config.isQuiting = true;

					app.quit();
				},
			},
		]),
	);

	return t;
};
