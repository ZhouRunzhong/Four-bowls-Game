var board = new Vue({
	el: '#board',
	data: {
		board_point: [1, 4, 4, 4],
	},
	methods: {
		move: function(target) {
			let temp = this.board_point;
			let movements = this.board_point[target]; //获得棋子有几个
			temp[target] = 0; //该碗中所有棋子被取出，所以棋子数归零
			this.board_point = [...temp];
				for (let i = 1; i <= movements; i++) { //将取出棋子按顺时针投入各个碗中
					let point = i + target;
					let j = i
					point = board.standard(point);
					setTimeout(function aaaa() {
						temp[point] += 1
						console.log(temp);
						board.board_point = [...temp];
						if(j==movements){
							if (temp[board.standard(movements + target + 1)] != 0) {
								board.move(board.standard(movements + target + 1));
							}else{
								board.getScore(board.standard(movements + target + 2));//投子完成后，判断是否得子
							}
						}
					}, j * 1000)
				}
				

		},
		getScore: function(num) {
			let score= this.board_point[num];
			let temp=this.board_point;
			temp[num]=0;
			this.board_point=[...temp];
			alert("玩家"+count.whoseTurn+"得了"+score+"分！");
			if(count.whoseTurn==1){
				count.player1Score=score;
				count.whoseTurn=2;
			}else{
				count.player2Score=score;
				count.whoseTurn=1;
			}
			if([...temp].reduce((x,y)=>x+y)==1){//当棋盘上的棋子总数下降到一个的时候，游戏结束
				alert("游戏结束！玩家"+(count.player1Score>count.player2Score?"1":"2")+"胜利！")
			}
		},
		standard: function(point) { //当总步数大于4时，将其减到低于4，以便于程序操作数组
			while (point > 3) {
				point = point - 4
			}
			return point
		},
		reset:function(){
			if(confirm("重新开局？")){
				this.board_point=[1,3,3,3];
				count.whoseTurn=1;
				count.player1Score= 0,
				count.player2Score= 0
			}
		}
	}
})
var count = new Vue({
	el: '#count',
	data: {
		whoseTurn: 1,
		player1Score: 0,
		player2Score: 0
	}
})
