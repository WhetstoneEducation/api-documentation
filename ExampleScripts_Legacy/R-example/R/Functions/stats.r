make_nce_from_percentile <- function(percentile.vec) {
  qnorm(percentile.vec/100)*21.06 + 50
}

find.mode <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}

neg_safe_percent <- function (x) {
    x <- round_any(x, x/100)
    paste0(comma(x * 100), "%")
}