export class Config {
    public static ApiHost = location.hostname
    public static ApiPort = location.port
    public static ApiEndpoint = location.protocol + "//" + location.host
    public static WSServerProtocol = "sftty"
    public static WSServerUrl = "://" + location.host + "/ws";
    public static MaxOpenTerminals = 5
    public static ClientSecret = ""
    public static DesktopDisabled = false
    public static SfEndpoint = "segfault.net"
    public static WSPingInterval = 25
    public static BuildHash = ""
    public static BuildTime = ""
    public static LoggedIn = false
    public static TabId = ""
    public static AllowedEndpoints = Array<string>()
}