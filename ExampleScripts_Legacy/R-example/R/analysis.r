library(tidyverse)
library(stringr)
library(lubridate)
library(tidyjson)
library(jsonlite)
# There may be other packages for working with an API, but I like Hadley's work
library(httr)

update_functions <- function() {
	old.wd <- getwd()
	setwd("functions")
	sapply(list.files(), source)
	setwd(old.wd)
}
update_functions()

# Use the API method to get all observations
res <- api_get('observations')

# We actually want the raw json response
j <- content(res$response, "text")

# Use tidyjson to construct a data.frame with the information we want to plot
d <- j %>%
	as.tbl_json %>% 
	gather_array %>%
	spread_values(
		obs.type = jstring('observationType', 'name'),
		observer = jstring('observer', 'name'),
		school = jstring('teachingAssignment', 'school', 'name'),
		observed.at = jstring('observedAt')
	) %>%
	mutate(observed.at.parsed = with_tz(ymd_hms(observed.at, tz = "UTC"), "America/Chicago")) %>%
	mutate(
		year = year(observed.at.parsed),
		month = month(observed.at.parsed),
		week = week(observed.at.parsed)		
	)
	
# Group data
d.s <- d %>%
	filter(!is.na(school)) %>%
	group_by(school, year, week) %>%
	summarize(n = n()) %>%
	mutate(
		year.week = paste(year, week, 1, sep = ' '),
		week.beginning = parse_date_time(year.week, orders = 'y U w')
	)
	
# Make plot
ggplot(d.s, aes(x = as.Date(week.beginning), y = n))+
	geom_line(alpha = 0.5, aes(color = school))+
	geom_point(aes(color = school))+
	scale_x_date(date_labels = "%y %b",
		date_breaks = "1 month"
	)+
	labs(
		x = "Week Starting",
		y = "Number of Observations",
		title = "Number of Observations Per Week by School"
	)+
	theme_bw()

# save_plot_as_pdf(p, "Observations by Week by School")