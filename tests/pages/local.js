module.exports = {
  url: "http://localhost:8081/public/index.html",
  commands: [{
    tituloFoiExibido: function(){
      this
    }
  }],
  elements: {
    header: {
      selector: "h1"
    },
    select: {
      selector: "div.select"
    }
  }
}
