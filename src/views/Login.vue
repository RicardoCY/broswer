<template>
  <div class="home">
    <el-col :span="24">
      <header class="comm-header">
        <img style="margin:28px 40px" src="../assets/companyLogo.png" alt>
        <i class="el-icon-question" style="float:right;font-size:22px;margin:29px 24px"></i>
      </header>
    </el-col>
    <el-col v-if="accontPass==0" :span="6" :offset="14">
      <div v-if="showForm==1" class="form-container">
        <div class="form-container-header">
          <span>
            <a :class="{'active_a':TabPass=='pass'}" @click="handlerTab('pass')">密码登录</a>
          </span>
          <span>
            <a :class="{'active_a':TabPass=='code'}" @click="handlerTab('code')">验证码登录</a>
          </span>
        </div>
        <div v-show="TabPass=='pass'">
          <el-form
            :model="ruleForm1"
            status-icon
            ref="ruleForm1"
            label-style="text-align: center"
            class="demo-ruleForm"
          >
            <el-form-item
              prop="name"
              :rules="[
          { required: true, message: '请输入用户名', trigger: 'change' },
          {pattern:/^[a-zA-Z0-9_-]{6,16}$/, message: '用户名为6到16位（字母，数字，下划线，减号）', trigger: 'change'},
          ]"
              style="text-align: center"
            >
              <el-input placeholder="请输入用户名" v-model="ruleForm1.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
              prop="pass"
              :rules="[
          { required: true, message: '请输入登录密码', trigger: 'change' },
          {pattern:/^[a-zA-Z0-9]{6,16}$/, message: '密码不能含有非法字符，长度在6-16之间', trigger: 'change'},
          ]"
              style="text-align: center"
            >
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="ruleForm1.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="num"
              :rules="[
          { required: true, message: '请输入验证码', trigger: 'change' },
          {pattern:/^\w{6}$/, message: '请输入正确的验证码', trigger: 'change'},
          ]"
              style="text-align: center"
            >
              <div class="code-container">
                <el-input placeholder="验证码" v-model="ruleForm1.num"></el-input>
                <span style="color:red">{{modifyCode}}</span>
              </div>
            </el-form-item>
            <p style="direction:rtl">
              <span
                style="font-size:16px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(255,97,97,1);
line-height:22px;"
                @click="showForm=2"
              >忘记密码</span>
            </p>
            <el-form-item>
              <el-button
                class="login-btn"
                :loading="loading"
                type="primary"
                @click="submitForm('ruleForm1')"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="TabPass=='code'">
          <el-form :model="ruleForm2" status-icon ref="ruleForm2" class="demo-ruleForm">
            <el-form-item
              prop="mobile"
              style="text-align: center"
              :rules="[
          { required: true, message: '请输入手机号', trigger: 'change' },
          {pattern:/^1\d{10}$/, message: '请输入正确的手机号', trigger: 'change'},
          ]"
            >
              <el-input placeholder="手机号" v-model="ruleForm2.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              prop="mobileCode"
              style="text-align: center"
              :rules="[
          { required: true, message: '请输入手机验证码', trigger: 'change' },
          {pattern:/^\d{6}$/, message: '请输入正确的手机验证码', trigger: 'change'},
          ]"
            >
              <div class="code-container">
                <el-input placeholder="手机验证码" v-model="ruleForm2.mobileCode" autocomplete="off"></el-input>
                <span>
                  <el-button
                    style="float:right;width:95%"
                    :disabled="comeFromMail"
                    :loading="getCodeLoad"
                    @click="getModifyCode(ruleForm2.mobile)"
                  >{{getCodeLoad?btnTime + "s后获取":"获取验证码"}}</el-button>
                </span>
              </div>
            </el-form-item>
            <el-form-item
              prop="num"
              style="text-align: center"
              :rules="[
          { required: true, message: '请输入手机验证码', trigger: 'change' },
          {pattern:/^\w{6}$/, message: '请输入正确的手机验证码', trigger: 'change'},
          ]"
            >
              <div class="code-container">
                <el-input placeholder="验证码" v-model="ruleForm2.num"></el-input>
                <span style="color:red">{{modifyCode}}</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>

        <p style="text-align:center">
          没有账号 ,
          <router-link to="/about">
            <span style="color: #3BC492 ;">马上注册</span>
          </router-link>
        </p>
      </div>
      <div v-else-if="showForm==2" class="form-container">
        <p style=" text-align: center;">
          <span
            style="
          display:inline-block;
          text-align: center;
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(59,196,146,1);
        border-bottom: 2px solid rgba(59,196,146,1);
        height: 50px;
        margin-bottom: 16px;"
          >找回密码</span>
        </p>
        <el-form
          :model="ruleForm3"
          status-icon
          ref="ruleForm3"
          label-style="text-align: center"
          class="demo-ruleForm"
        >
          <el-form-item
            prop="mobile"
            style="text-align: center"
            :rules="[
          { required: true, message: '请输入手机号', trigger: 'change' },
          {pattern:/^1\d{10}$/, message: '请输入正确的手机号', trigger: 'change'},
          ]"
          >
            <el-input placeholder="手机号" v-model="ruleForm3.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="mobileCode"
            style="text-align: center"
            :rules="[
          { required: true, message: '请输入手机验证码', trigger: 'change' },
          {pattern:/^\d{6}$/, message: '请输入正确的手机验证码', trigger: 'change'},
          ]"
          >
            <div class="code-container">
              <el-input placeholder="手机验证码" v-model="ruleForm3.mobileCode" autocomplete="off"></el-input>
              <span>
                <el-button
                  style="float:right;width:95%"
                  :disabled="comeFromMail"
                  :loading="getCodeLoad"
                  @click="getModifyCode(ruleForm3.mobile)"
                >{{getCodeLoad?btnTime + "s后获取":"获取验证码"}}</el-button>
              </span>
            </div>
          </el-form-item>
          <el-form-item
            prop="imgCode"
            style="text-align: center"
            :rules="[
          { required: true, message: '请输入手机验证码', trigger: 'change' },
          {pattern:/^\w{6}$/, message: '请输入正确的手机验证码', trigger: 'change'},
          ]"
          >
            <div class="code-container">
              <el-input placeholder="验证码" v-model="ruleForm3.imgCode"></el-input>
              <span style="color:red">{{modifyCode}}</span>
            </div>
          </el-form-item>
          <!-- <el-form-item prop="mobileCode" style="text-align: center">
            <el-input placeholder="手机验证码" type="password" v-model="ruleForm3.mobileCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="imgCode" style="text-align: center">
            <el-input placeholder="图片验证码" v-model.number="ruleForm3.imgCode"></el-input>
          </el-form-item>-->
          <p style="direction:rtl">
            <span
              style="font-size:16px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(255,97,97,1);
line-height:22px;"
              @click="showForm=1"
            >已想起</span>
          </p>

          <el-form-item>
            <el-button class="login-btn" type="primary" @click="handlerToReset">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="showForm==3" class="form-container">
        <p style=" text-align: center;">
          <span
            style="
          display:inline-block;
          text-align: center;
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(59,196,146,1);
        border-bottom: 2px solid rgba(59,196,146,1);
        height: 50px;
        margin-bottom: 16px;"
          >重置密码</span>
        </p>
        <el-form
          :model="ruleForm4"
          status-icon
          ref="ruleForm4"
          label-style="text-align: center"
          class="demo-ruleForm"
        >
          <el-form-item
            prop="pass"
            style="text-align: center"
            :rules="[
          { required: true, message: '请输入登录密码', trigger: 'change' },
          {pattern:/^[a-zA-Z0-9]{6,16}$/, message: '密码不能含有非法字符，长度在6-16之间', trigger: 'change'},
          ]"
          >
            <el-input placeholder="新密码" type="password" v-model="ruleForm4.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="repass"
            style="text-align: center"
            :rules="[
          { required: true, message: '请确认登录密码', trigger: 'change' },
          {pattern:/^[a-zA-Z0-9]{6,16}$/, message: '密码不能含有非法字符，长度在6-16之间', trigger: 'change'},
          ]"
          >
            <el-input
              placeholder="重复新密码"
              type="password"
              v-model="ruleForm4.repass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="handlerReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>

    <el-col class="pass-container" v-else-if="accontPass==1">
       <img src="../assets/pass.png" alt="">
       <p>您的信息已提交，系统还在审核中，请耐心等待</p>
    </el-col>
    <el-col class="pass-container"  v-else-if="accontPass==3">
      <img src="../assets/nopass.png" alt="">
      <p >您提交的信息有误，系统审核不通过，请点击下方进行信息修改</p>
      <el-button class="login-btn" style="width:200px;margin-top:50px" type="primary" @click="toModify">修改信息</el-button>
    </el-col>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import { constants } from "crypto";
import Cookie from "js-cookie";
// @ is an alias to /src

export default {
  name: "login",
  components: {},
  data() {
    return {
      accontPass: 0,
      loading: false,
      showForm: 1,
      checkVisible: false,
      checked: false,
      dialogVisible: false,
      dialogImageUrl: "",
      activeName: "first",
      fileList1: [],
      fileList2: [],
      ruleForm1: {},
      ruleForm2: {
        mobile: "",
        mobileCode: "",
        num: ""
      },
      ruleForm3: {},
      ruleForm4: {},
      TabPass: "pass",
      modifyCode: "",
      getCodeLoad: false,
      btnTime: 60,
      comeFromMail: false,
      modifyId:''
    };
  },
  methods: {
    handlerToReset() {
      this.$refs["ruleForm3"].validate(valid => {
        if (valid) {
          //TODO: 同后台取认
          this.$http.post('customer/find',{
            phone:this.ruleForm3.mobile,
            code:this.ruleForm3.mobileCode,
          }).
          then(res=>{
            this.modifyId=res.data
          })
          this.showForm = 3;
        } else {
          this.$message({
            message: "请正确填写表单",
            type: "warning"
          });
          return false;
        }
      });
    },
    handlerTab(type = "pass") {
      this.TabPass = type;
      console.log(type);
    },
    handlerReset() {
      this.$refs["ruleForm4"].validate(valid => {
        if (valid&&(this.ruleForm4.pass==this.ruleForm4.repass)){
          //TODO: 同后台取认
          this.$http.post('customer/update',{
              id:this.modifyId.id,
              loginPwd:this.ruleForm4.pass,
              operator:this.modifyId.id,
          }).then(res=>{
             this.showForm = 1;
             this.$notify({
                  title: "成功",
                  message: "密码重置成功",
                  type: "success"
                });
          })
         
        } else {
          this.$message({
            message: "请正确填写表单",
            type: "warning"
          });
          return false;
        }
      });
    },
    onArgeen(val) {
      if (val == "ok") {
        this.checkVisible = false;
        this.checked = true;
      } else {
        this.checkVisible = false;
        this.checked = false;
      }
    },
    getCode(n) {
      var all =
        "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
      var b = "";
      for (var i = 0; i < n; i++) {
        var index = Math.floor(Math.random() * 62);
        b += all.charAt(index);
      }
      return b;
    },
    getModifyCode(test) {
      let phoneReg = new RegExp(/^1\d{10}$/);
      console.log(test);
      console.log(this.showForm);
      if (phoneReg.test(test)) {
        this.btnTime = 60;
        this.getCodeLoad = true;
        var timer = setInterval(() => {
          this.btnTime--;
          if (this.btnTime <= 0) {
            this.getCodeLoad = false;
            clearInterval(timer);
          }
        }, 1000);
        switch (this.showForm) {
          case 1: //登录
            this.$http.get(`/sms/login/${test}`).then(
              res => {
                this.$notify({
                  title: "成功",
                  message: "验证码已发送至手机，请注意查收",
                  type: "success"
                });
              },
              error => {
                this.btnTime = 0;
              }
            );
            break;
          case 2: //找回密码
            this.$http.get(`/sms/find/${test}`).then(
              res => {
                this.$notify({
                  title: "成功",
                  message: "找回验证码已发送至手机，请注意查收",
                  type: "success"
                });
              },
              error => {
                this.btnTime = 0;
              }
            );
            break;
        }
      } else {
        this.$message({
          message: "请填写正确的手机号码",
          type: "warning"
        });
      }
    },
    OnCheck() {
      this.checkVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      switch (formName) {
        case "ruleForm1":
          this.$refs[formName].validate(valid => {
            if (
              valid &&
              String(this.ruleForm1.num).toUpperCase() ==
                String(this.modifyCode).toUpperCase()
            ) {
              this.loading = true;
              console.log(this.ruleForm1);
              this.$http
                .post("customer/login", {
                  loginName: this.ruleForm1.name,
                  loginPwd: this.ruleForm1.pass
                })
                .then(res => {
                  this.$notify({
                    title: "成功",
                    message: "登录成功",
                    type: "success"
                  });
                   Cookie.set("userInfo", res.data);
                  if (res.data.state == 2) {
                    this.$router.push("/index");
                  } else if (res.data.state == 1) {
                    this.accontPass = 1;
                  } else if (res.data.state == 3) {
                    this.accontPass = 3;
                  }
                  this.loading = false;
                }).catch(e=>{
                   this.loading = false;
                })
            } else {
              this.$message({
                message: "请正确填写表单",
                type: "warning"
              });
              return false;
            }
          });
          break;
        case "ruleForm2":
          this.$refs[formName].validate(valid => {
            if (
              valid &&
              String(this.ruleForm2.num).toUpperCase() ==
                String(this.modifyCode).toUpperCase()
            ) {
              this.loading = true;
              console.log(this.ruleForm2);
              this.$http
                .post("customer/quickLogin", {
                  phone: this.ruleForm2.mobile,
                  code: this.ruleForm2.mobileCode
                })
                .then(res => {
                    Cookie.set("userInfo", res.data);
                  if (res.data.state == 2) {
                    this.$router.push("/index");
                  
                  } else if (res.data.state == 1) {
                    this.accontPass = 1;
                  } else if (res.data.state == 3) {
                    this.accontPass = 3;
                  }
                  this.loading = false;
                });
            } else {
              this.$message({
                message: "请正确填写表单",
                type: "warning"
              });

              return false;
            }
          });
          break;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toModify(){
      this.$router.replace('/modifyAbout')
    }
  },
  mounted() {
    this.modifyCode = this.getCode(6);
    console.log(this.getCode(6));
  }
};
</script>

<style lang="less" scoped>
.pass-container{
  text-align: center;
  img{
    margin-top: 100px;
    height: 144px;
    width: 144px;
  }
  p{
    margin-top: 25px;
    font-size:20px;
    font-weight:600;
    color:rgba(44,45,58,1);
  }
}

.login-btn {
  width: 100%;
  margin-top: 13px;
  background: rgba(59, 196, 146, 1);
  border-radius: 28px;
  border-color: rgba(59, 196, 146, 1);
  &:hover {
    background: rgba(59, 196, 146, 0.7);
    border-color: rgba(59, 196, 146, 0.7);
  }
}

.active_a {
  color: rgba(59, 196, 146, 1) !important;
  border-bottom: 2px solid rgba(59, 196, 146, 1);
}

.code-container {
  display: flex;
  .el-input {
    flex: 3;
  }
  span {
    flex: 2;
  }
}

.home {
  .form-container {
    margin-top: 72px;
    padding: 37px 56px;
    box-shadow: 0px 4px 16px 0px rgba(131, 143, 153, 0.15);
    border-radius: 16px;
    min-width: 464px;
    &-header {
      display: flex;
      span {
        flex: 1;
        text-align: center;
        font-size: 22px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(59, 196, 146, 1);
        height: 50px;
        margin-bottom: 16px;
        a {
          color: rgba(131, 143, 153, 1);
          display: inline-block;
          height: 100%;
        }
      }
    }
  }
}
</style>
