module.exports = {
    client_id: process.env.DISCORD_CLIENT_ID,
    permissions: process.env.DISCORD_PERMISSIONS,
    loginToken: process.env.DISCORD_LOGIN_TOKEN,
    commandTrigger: process.env.DISCORD_COMMAND_TRIGGER || "!",
}