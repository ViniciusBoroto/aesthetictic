var ctx = document.getElementById("MyChart"); //armazerna todo  elemento de canvas de id correspondente na variavel ctx
var chart = ctx.getContext("2d"); //habilita propriedades e métodos para desenhar os graficso no canvas(como em um plano cartesiano)

//
chart.filstyle = "red";
chart.fillRect(0, 0, 100, 200); // parametros (<eixo x>, <eixo y>, <tamanho>, <altura>)
