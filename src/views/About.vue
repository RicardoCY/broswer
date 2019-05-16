<template>
  <div class="about">
    <el-col :span="24">
      <header class="comm-header">
        <img style="margin:28px 40px" src="../assets/companyLogo.png" alt>
        <i class="el-icon-question" style="float:right;font-size:22px;margin:29px 24px"></i>
      </header>
    </el-col>
    <el-col :span="10" :offset="8">
      <div class="reg-container">
        <h4>
          <span>注册账号</span>
        </h4>
        <el-form :model="form" ref="validateForm">
          <el-form-item
            prop="customerName"
            :rules="[
          { required: true, message: '请输入企业名称', trigger: 'change' },
          {pattern:/^[\u4e00-\u9fa5]{5,30}$/, message: '企业名称为5到30个的汉字', trigger: 'change'},
          ]"
          >
            <el-input placeholder="企业名称" v-model="form.customerName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="abbreviation"
            :rules="[
          { required: true, message: '请输入企业简称', trigger: 'change' },
          {pattern:/^[\u4e00-\u9fa5]{2,10}$/, message: '企业简称为2到10个的汉字', trigger: 'change'},
          ]"
          >
            <el-input placeholder="企业简称" v-model="form.abbreviation " autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="contact"
            :rules="[
          { required: true, message: '请输入企业联系人', trigger: 'change' },
          {pattern:/^[\u4e00-\u9fa5]{2,5}$/, message: '企业联系人为2到5个的汉字', trigger: 'change'},
          ]"
          >
            <el-input placeholder="企业联系人" v-model="form.contact" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="userName"
            :rules="[
          { required: true, message: '请输入用户名', trigger: 'change' },
          {pattern:/^[a-zA-Z0-9_-]{6,16}$/, message: '用户名为6到16位（字母，数字，下划线，减号）', trigger: 'change'},
          ]"
          >
            <el-input placeholder="用户名" v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="loginPwd"
            :rules="[
          { required: true, message: '请输入登录密码', trigger: 'change' },
          {pattern:/^[a-zA-Z0-9]{6,16}$/, message: '密码不能含有非法字符，长度在6-16之间', trigger: 'change'},
          ]"
          >
            <el-input placeholder="密码" v-model="form.loginPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="mobile"
            :rules="[
          { required: true, message: '请输入手机号码', trigger: 'change' },
          {pattern:/^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'change'},
          ]"
          >
            <el-input placeholder="企业联系手机" v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
            prop="code"
            style="text-align: center"
            :rules="[
          { required: true, message: '请输入手机验证码', trigger: 'change' },
          {pattern:/^\d{6}$/, message: '请输入正确的手机验证码', trigger: 'change'},
          ]"
          >
            <div class="code-container">
              <el-input placeholder="手机验证码" v-model="form.code" autocomplete="off"></el-input>
              <span>
                <el-button
                  style="float:right;width:95%"
                  :disabled="comeFromMail"
                  :loading="getCodeLoad"
                  @click="getModifyCode(form.mobile)"
                >{{getCodeLoad?btnTime + "s后获取":"获取验证码"}}</el-button>
              </span>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="upload-container">
              <span>上传公司logo</span>
              <el-upload
                ref="upload1"
                :action="`${$http.defaults.img_url}/pst_service_file/file/uploadImg`"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="handleBefore1"
                :on-success="handleSuccess1"
                :on-error = "handleError"
                :before-remove="handleBeforeRemove"
                :on-remove="handleRemove1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="upload-container">
              <span>上传营业执照</span>
              <el-upload
                ref="upload"
                :action="`${$http.defaults.img_url}/pst_service_file/file/uploadImg`"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="handleBefore"
                :on-success="handleSuccess"
                :on-error = "handleError"
                :before-remove="handleBeforeRemove"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <p>
          <i :class="[checked?'el-icon-success':'el-icon-error']"></i>
          <span @click="OnCheck">我已同意用户协议</span>
          <!-- <el-checkbox v-model="checked">我已阅读用户协议</el-checkbox> -->
        </p>
        <div class="dialog-footer">
          <el-button class="login-btn" :loading="loading" type="primary" @click="handleReg">创 建 账 号</el-button>
        </div>
      </div>
    </el-col>
    <!-- 用户协议 -->
    <el-dialog style="margin-top:-80px;" :visible.sync="checkVisible">
      <div class="reg-text">
        <h4>
          <span>彦旭工资条用户注册协议</span>
        </h4>
        <p>作为账号运营者，代表申请人向彦旭工资条申请使用服务，同时负责对申请人的账号进行管理，包括但不限于管理工资条邮件、短信发送等。</p>
        <p>申请人承诺：</p>
        <p>1、所有提交材料真实准确，合法有效，如材料不实或不完整，悦享工资条有权拒绝提供服务，或随时收回账号并停止服务，因此产生的一切责任由申请人自行承担。</p>
        <p>2、申请人对账号的运营和维护遵照法律法规、政策、彦旭工资条服务协议及相关规则规范，不侵犯第三人的合法权益，如违反上述承诺，责任自行承担。</p>

        <p>3、申请人对该账号的一切行为及该账号运营下的成员行为和后果承担责任。</p>
        <p>4、申请人保证其发送工资条成员均为内部人员，保证不对悦享工资条任何服务或服务的使用或获得，进行复制、拷贝、出售或用于包括但不限于广告及任何其他商业目的。</p>
        <p>申请悦享工资条免费服务，需提交以下材料： 三证合一营业执照的照片或扫描件；</p>
        <p>申请提交后，将在24小时内进行审核。审核结果将以短信的方式发送至您的注册手机号。</p>
      </div>
      <!-- <el-button @click="onArgeen('dis')">不同意</el-button>
      <el-button @click="onArgeen('ok')">同意</el-button>-->
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="onArgeen('ok')" class="login-btn" style="width:350px" type="primary">同 意</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="ImgdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>


<script>
// @ is an alias to /src
import axios from "axios";
import { constants } from "crypto";
import { fail } from "assert";

export default {
  name: "about",
  components: {},
  data() {
    return {
      loading: false,
      imgSrc: "",
      dialogImageUrl: "",
      ImgdialogVisible: false,
      checkVisible: false,
      checked: false,
      dialogVisible: false,
      dialogImageUrl: "",
      activeName: "first",
      fileList1: 0,
      fileList2: [],
      form: {
        abbreviation: "",
        code: "",
        contact: "",
        customerName: "",
        licenseUrl: "",
        loginPwd: "",
        logoUrl: "",
        mobile: "",
        userName: ""
      },
      getCodeLoad: false,
      btnTime: 60,
      comeFromMail: false,
      logoImg: "",
      lincenseImg: ""
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.ImgdialogVisible = true;
    },
    handleReg() {
      this.$refs["validateForm"].validate(valid => {
        console.log(this.form);
        if (valid) {
          if (this.checked) {
            if (this.lincenseImg && this.logoImg) {
              this.loading = true;
              this.$http
                .post("customer/add", {
                  abbreviation: this.form.abbreviation,
                  code: this.form.code,
                  contact: this.form.contact,
                  customerName: this.form.customerName,
                  licenseUrl: this.lincenseImg,
                  loginPwd: this.form.loginPwd,
                  logoUrl: this.logoImg,
                  mobile: this.form.mobile,
                  userName: this.form.userName
                })
                .then(res => {
                  console.log(res.data);
                  this.$notify({
                    title: "成功",
                    message: "注册成功",
                    type: "success"
                  });
                  this.loading = false;
                  this.$router.push("/login");
                })
                .catch(e => {
                  this.loading = false;
                })
                .finally(() => {});
            } else {
              this.$message({
                message: "请上传logo和营业执照",
                type: "warning"
              });
            }
          } else {
            this.$message({
              message: "请先同意用户守则",
              type: "warning"
            });
          }
        } else {
          console.log("error submit!!");
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
    OnCheck() {
      this.checkVisible = true;
      // this.arggen?this.checked=true:this.checked=false
    },
    handleRemove(file, fileList) {
      this.$refs.upload.$children[0].$el.style.display = "none";
      this.$refs.upload.$children[1].$el.style.display = "flex";
      this.logoImg=''
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleError(){
        this.$notify({
              title: "失败",
              message: "图片上传失败，请稍后重试",
              type: "error"
            });
    },
    handleSuccess(response, file, fileList) {
      this.fileList1 = fileList.length;
      this.logoImg = response.data[0];
    },
    handleBefore() {
      this.$refs.upload.$children[1].$el.style.display = "none";
      this.$refs.upload.$children[0].$el.style.display = "inline-block";
    },
    //
    handleRemove1(file, fileList) {
      this.$refs.upload1.$children[0].$el.style.display = "none";
      this.$refs.upload1.$children[1].$el.style.display = "flex";
      this.lincenseImg =''
    },
    handleSuccess1(response, file, fileList) {
      this.fileList1 = fileList.length;
      this.lincenseImg = response.data[0];
    },
    handleBefore1() {
      this.$refs.upload1.$children[1].$el.style.display = "none";
      this.$refs.upload1.$children[0].$el.style.display = "inline-block";
    },
    handleBeforeRemove() {},
    getModifyCode(test) {
      console.log(test);
      let phoneReg = new RegExp(/^1\d{10}$/);
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
        this.$http.get(`/sms/register/${test}`).then(
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
      } else {
        this.$message({
          message: "请填写正确的手机号码",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.code-container {
  display: flex;
  .el-input {
    flex: 3;
  }
  span {
    flex: 2;
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

.upload-container {
  display: flex;
  height: 144px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 16px;
  span {
    flex: 3;
  }
}

.about {
  .reg-container {
    h4 {
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(59, 196, 146, 1);
      line-height: 30px;
      text-align: center;
      margin-bottom: 32px;
      span {
        height: 50px;
        display: inline-block;
        border-bottom: 2px solid rgba(59, 196, 146, 1);
      }
    }
    padding: 37px 100px;
    box-shadow: 0px 4px 16px 0px rgba(131, 143, 153, 0.15);
    border-radius: 16px;
    margin: 40px 0;
  }
  .dialog-footer {
  }
  .reg-text p {
    line-height: 2;
    margin: 10px 0;
  }

  .reg-text h4 {
    font-size: 22px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(59, 196, 146, 1);
    line-height: 30px;
    text-align: center;
    margin-bottom: 32px;
    span {
      height: 50px;
      display: inline-block;
    }
  }
}
</style>
