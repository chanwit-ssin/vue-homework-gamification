<template>
    <div class="bar">
        <div class="header_top">
            <!-- <h1 class="title">Homework</h1> -->
            <h1 style="font-size:16pt;color:black;"><b>{{user.first_name}} {{user.last_name}}</b></h1>
            <h1 style="font-size:13pt;color:black" v-if="userRole == 'Student'">คะแนนคงเหลือ : {{user.left_point}}</h1>
        </div>
        
        <el-menu class="el-menu-vertical-demo" :popper-append-to-body="false">
            <el-menu-item index="1" @click="changeRounter('homeworks')" v-if="userRole == 'Student'" :disabled="isDisabled">
                <i class="el-icon-document" style="color:black"></i>
                <span slot="title">การบ้าน</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeRounter('rewards/redeem')" v-if="userRole == 'Student'" :disabled="isDisabled">
                <i class="el-icon-present" style="color:black"></i>
                <span slot="title">คะแนน - แลกรางวัล</span>
            </el-menu-item>

            <el-menu-item index="3" @click="changeRounter('homeworks')" v-if="userRole == 'Teacher'" :disabled="true">
                <i class="el-icon-document-copy" style="color:black"></i>
                <span slot="title">ตรวจการบ้าน</span>
            </el-menu-item>
            <el-menu-item index="4" @click="changeRounter('homework/create')" v-if="userRole == 'Teacher'" :disabled="isDisabled">
                <i class="el-icon-document-add" style="color:black"></i>
                <span slot="title">สั่งการบ้าน</span>
            </el-menu-item>


            <el-menu-item index="5" :disabled="isDisabled" @click="changeRounter('leaderboard')" v-if="userRole == 'Admin'">
                <i class="el-icon-medal-1" style="color:black"></i>
                <span slot="title">กระดานคะแนน</span>
            </el-menu-item>
            <el-menu-item index="6" @click="changeRounter('rewards/manage')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-setting" style="color:black"></i>
                <span slot="title">จัดการรางวัล</span>
            </el-menu-item>
            <el-menu-item index="7" @click="changeRounter('users/manage')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-setting" style="color:black"></i>
                <span slot="title">จัดการผู้ใช้งาน</span>
            </el-menu-item>
            <el-menu-item index="8" @click="changeRounter('users/create')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-setting" style="color:black"></i>
                <span slot="title">เพิ่มผู้ใช้งาน</span>
            </el-menu-item>
            <el-menu-item index="9" @click="changeRounter('RegisterSubject')" v-if="userRole == 'Admin'" :disabled="isDisabled">
                <i class="el-icon-circle-plus-outline" style="color:black"></i>
                <span slot="title">เพิ่มวิชาให้นักเรียน</span>
            </el-menu-item>
            <el-menu-item index="10" @click="logout">
                <i class="el-icon-switch-button" style="color:black"></i>
                <span slot="title">ออกจากระบบ</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  data() {
    return {
        isDisabled: false,
        userRole: JSON.parse(localStorage.getItem('auth_key')).user.role.name,
        user: AuthUser.getters.user
    }
  },
  methods: {
    async logout() {
        await AuthUser.dispatch("logout", )
        this.$confirm('ออกจากระบบ', '', {
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'ออกจากระบบสำเร็จ'
          });
          this.$router.push("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'ยกเลิกการออกจากระบบ'
          });          
        });
    },
    changeRounter(route) {
        this.$router.push(`/${route}`)
    }
  }  
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-top: 0px;
    background-color: #ffffff;
}

.icon {
    margin-left: 25px;
    margin-top: 30px;
    width: 50px;
}

.el-menu-item {
    display: block;
}

.bar {
    display: inline-block;
    z-index: 1;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    background: #ffffff;
    width: 275px;
    height: 100%;
}

.title {
  top: 15px;
  left: 30px;
  font-size: 30px;
  border-color: 1px 1px black;

}

.header_top {
    margin-top: 10%;
    margin-left: 10%;
    margin-bottom: 10%;
}

.account_drop{
    background-color: rgb(183, 218, 218);
}
</style>