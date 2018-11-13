/**
 * Created by rockyl on 2018/8/21.
 */
 
export default class GameInfo{
	data:any;

	creditUnit;

	update(data){
		this.data = data;
		this.data.oldMaxScore = this.data ? this.maxScore : 0;
	}

	get statusCode(){
		return this.data.status.code;
	}

	get maxScore(){
		return this.data.maxScore || 0;
	}

	get percentage(){
		return this.data.percentage;
	}

	get credits(){
		return this.data.credits;
	}

	get status(){
		return this.data.status;
	}
	
	get gameId(){
		 return this.data.gameId;
	}

	get consumerId(){
		 return this.data.consumerId;
	}
}
