# Access your API key from the user's settings page in Whetstone
api.key <- Sys.getenv("WHETSTONE_PAT")

# Turn the API key into an authentication token
resp <- POST("https://demo.whetstoneeducation.com/auth/api",
	body = list(apikey = api.key)
)
access.token <- content(resp)$token

# Functions that always pass authentication headers
api_get <- function(path) {
	# Allows only the path to be passed into the function, rather than whole URL
	url <- modify_url("https://demo.whetstoneeducation.com",
		path = str_c("api/v2/", path)
	)
	
	resp <- GET(url, add_headers("x-access-token" = access.token, "x-key" = api.key))
	if (http_type(resp) != "application/json") {
    stop("API did not return json", call. = FALSE)
  }
	parsed <- jsonlite::fromJSON(content(resp, "text"), simplifyVector = FALSE, flatten = TRUE)
  
	# Check for error messages from server and display any
	if (http_error(resp)) {
    stop(
      sprintf(
        "Whetstone API request failed [%s]\n%s\n<%s>", 
        status_code(resp),
        parsed$message,
        parsed$documentation_url
      ),
      call. = FALSE
    )
  }
	
  structure(
    list(
      content = parsed,
      path = path,
      response = resp
    ),
    class = "whet_api"
  )
}

# Pretty printing function for the whet_api object
print.whet_api <- function(x, ...) {
  cat("<Whetstone ", x$path, ">\n", sep = "")
  str(x$content)
  invisible(x)
}