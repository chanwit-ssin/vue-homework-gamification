<template>
    <div>
        <el-card :body-style="{ padding: '0' }" style="margin: 20px" class="rcard">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px">
              <label style="font-size:1.5em"><b>{{reward.reward_name}}</b></label> <br>
              <label>{{reward.reward_point}} คะแนน</label>
          </div>
        </el-card>
    </div>
</template>

<script>
import RewardStore from "../../store/RewardStore"
import UserStore from "../../store/UserStore"
export default {
  data(){
    return{
      check:1
    }
  },  
  props:{
    reward: null,
    who: []
  },
    methods:{
        changeCheck(){
          if(this.check==1){
            this.check = 0
          }
          else if(this.check==0){
            this.check = 1
          }

        },
        exchange(r){
          r.reward_remain--
          let payload=r
          this.who.left_point -= r.reward_point
          this.who.used_point += r.reward_point

          UserStore.dispatch("edit",this.who)
          payload.users.push(this.who)

          // if (payload.reward_remain==0) {
          //   RewardStore.dispatch("delete",payload)
          // } else {
          //   RewardStore.dispatch("edit",payload)
          // }
          RewardStore.dispatch("edit",payload)

          this.changeCheck()

          // console.log("Student :");
          // console.log(this.who);

          
        }
    }

}
</script>


<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;

  }

  .image {
    width: 100%;
    display: block;
  }

  .confirm{
    padding-top: 10px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>