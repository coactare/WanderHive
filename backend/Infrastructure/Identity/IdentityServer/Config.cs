using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("catalogapi"),
                new ApiScope("basketapi"),
                new ApiScope("catalogapi.read"),
                new ApiScope("catalogapi.write"),
                new ApiScope("eshoppinggateway"),
                new ApiScope("orderingapi")
            };

        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                //List of Microservices can go here.
                new ApiResource("Catalog", "Catalog.API")
                {
                    Scopes = {"catalogapi.read", "catalogapi.write"}
                },
                new ApiResource("Basket", "Basket.API")
                {
                    Scopes = {"basketapi"}
                },
                new ApiResource("Ordering", "Orderingapi.API")
                {
                    Scopes = { "orderingapi" }
                },
                new ApiResource("EShoppingGateway", "EShopping Gateway")
                {
                    Scopes = {"eshoppinggateway", "basketapi", "catalogapi.read" }
                },
                new ApiResource("eshoppingAngular", "EShopping Angular")
                {
                    Scopes = {"eshoppinggateway", "catalogapi.read", "catalogapi.write", "basketapi", "catalogapi.read"}
                },
                new ApiResource("eshoppingReact", "EShopping React")
                {
                    Scopes = {"eshoppinggateway", "catalogapi.read", "catalogapi.write", "basketapi", "catalogapi.read"}
                }
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                //m2m flow 
                new Client
                {
                    ClientName = "Ordering API Client",
                    ClientId = "OrderingApiClient",
                    ClientSecrets = {new Secret("69d69d23-541a-4ad7-8267-28a1193d8348".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = { "orderingapi" }
                },
                new Client
                {
                    ClientName = "Catalog API Client",
                    ClientId = "CatalogApiClient",
                    ClientSecrets = {new Secret("5c6eb3b4-61a7-4668-ac57-2b4591ec26d2".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = {"catalogapi.read", "catalogapi.write"}
                },
                new Client
                {
                    ClientName = "Basket API Client",
                    ClientId = "BasketApiClient",
                    ClientSecrets = {new Secret("5c6ec4c5-61a7-4668-ac57-2b4591ec26d2".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = {"basketapi"}
                },

                new Client
                {
                    ClientName = "EShopping Gateway Client",
                    ClientId = "EShoppingGatewayClient",
                    ClientSecrets = {new Secret("5c7fd5c5-61a7-4668-ac57-2b4591ec26d2".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = {"eshoppinggateway", "basketapi"}
                },
                new Client
                {
                    ClientName = "Angular-Client",
                    ClientId = "angular-client",
                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = new List<string>
                        {
                            "http://localhost:4200/basket",
                            "http://localhost:4200",
                            "http://localhost:4200/",
                            "http://localhost:4200/checkout",
                            "http://localhost:4200/signin-callback",
                            "http://localhost:4200/assets/silent-callback.html",
                            "https://localhost:9009/signin-oidc"
                        },
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser = true,
                    Enabled = true,
                    UpdateAccessTokenClaimsOnRefresh = true,

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "eshoppinggateway"
                    },
                    AllowedCorsOrigins = {"http://localhost:4200"},
                    RequireClientSecret = false,
                    AllowRememberConsent = false,
                    //PostLogoutRedirectUris = new List<string> {"http://localhost:4200/signout-callback"},
                    RequireConsent = false,
                    AccessTokenLifetime = 3600,
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:4200/signout-callback",
                        "https://localhost:9009/signout-callback-oidc"
                    },
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("5c6eb3b4-61a7-4668-ac57-2b4591ec26d2".Sha256())
                    }
                },
                new Client
                {
                    ClientName = "React-Client",
                    ClientId = "react-client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:5173/basket",
                        "http://localhost:5173",
                        "http://localhost:5173/",
                        "http://localhost:5173/checkout",
                        "http://localhost:5173/signin-callback",
                        "http://localhost:5173/assets/silent-callback.html",
                        "https://localhost:9009/signin-oidc",
                        "http://localhost:5173/dashboard",
                        "http://localhost:5173/authentication/callback",
                        "http://localhost:5173/authentication/silent-callback"
                    },
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser = true,
                    Enabled = true,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "eshoppinggateway"
                    },
                    AllowedCorsOrigins = {"http://localhost:5173"},
                    RequireClientSecret = false,
                    AllowRememberConsent = false,
                    RequireConsent = false,
                    AccessTokenLifetime = 3600,
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:5173/signout-callback",
                        "https://localhost:9009/signout-callback-oidc"
                    }
                }
            };
    };
}