get_counts <- function(d, col, brks) {
    h <- hist(d[[col]], breaks=brks, plot=F)
    return(data.frame(h$mids, h$counts))
}