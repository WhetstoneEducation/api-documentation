load_data <- function() {
  d <- read.csv(file="./../Data/FILENAME.csv", head=TRUE,
    na.string=c("", " ", "  "), stringsAsFactors=F
  )
  names(d) <- tolower(names(d))
  return(d)
}
