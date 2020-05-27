save_plot_as_pdf <- function(plot, file_name, wide=T){
  if(wide){
    pdf(paste0("./../Output/", file_name, ".pdf"),
        width=10.5, height=8
    )
  }else{
    pdf(paste0("./../Output/", file_name, ".pdf"),
        width=8, height=10.5
    )
  }
  print(plot)
  dev.off()
}