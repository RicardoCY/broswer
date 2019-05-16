<template>
  <div class="setting-index">
    <el-main>
      <el-row :gutter="26">
        <el-col class="setting-main" :span="8" :offset="4">
          <div>
            <h4>
              账号基本信息
              <span class="title-modify" @click="handleModifyAccont">{{!modifyAccont?'修改':'保存'}}</span>
            </h4>
            <div class="setting-userInfo" v-if="!modifyAccont">
              <p>
                企业简称：
                <span>{{userInfo.abbreviation}}</span>
              </p>
              <p>
                联系人姓名：
                <span>{{userInfo.contact}}</span>
              </p>
              <p>
                手机号：
                <span>{{userInfo.mobile}}</span>
              </p>
              <p>
                公司logo：
                <span>
                  <img style="width:60px;height:60px" :src="userInfo.logoUrl" alt>
                </span>
              </p>
            </div>
            <div class="setting-userInfo" v-else>
              <p>
                企业简称：
                <span>
                  <el-input v-model="infoDetail.abbreviation"></el-input>
                </span>
              </p>
              <p>
                联系人姓名：
                <span>
                  <el-input v-model="infoDetail.contact"></el-input>
                </span>
              </p>
              <p>
                手机号：
                <span>
                  <el-input v-model="infoDetail.mobile"></el-input>
                </span>
              </p>
              <p>
                公司logo：
                <span>
                  <el-upload
                    ref="upload1"
                    :action="`${$http.defaults.img_url}/pst_service_file/file/uploadImg`"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="handleBefore1"
                    :on-success="handleSuccess1"
                    :before-remove="handleBeforeRemove"
                    :on-remove="handleRemove1"
                    :file-list="defautlImg"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </span>
              </p>
            </div>
          </div>
          <div style="margin-top:26px;">
            <h4>
              密码安全
              <span class="title-modify" @click="modifyPassShow=true">修改密码</span>
            </h4>
          </div>
        </el-col>
        <el-col class="setting-main" :span="8">
          <div>
            <h4>工资条设置</h4>
            <p>
              工资条邮件通知
              <span class="title-modify" @click="handleModifyTemplate">修改</span>
            </p>
            <p>
              允许员工访问
              <span class="title-modify">
                <el-switch v-model="switchVal" active-color="#3BC492" inactive-color="#ff4949"></el-switch>
              </span>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-main>
     <el-dialog
      title="修改邮件模板"
      :visible.sync="templateShow"
      style="margin-top:-60px"
    >
    <div>
        <edit	v-model="richText" :height="'350'"></edit>
        <div style="height:60px">
          <el-button  class="next-btn"  type="success" style="margin-top: 12px;float:right" >保存</el-button>
         <el-button  class="pre-btn"  type="text" style="margin-top: 12px;margin-right: 20px;float:right" @click="templateShow=false">取消</el-button>
        </div>
    </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="modifyPassShow"
      :before-close="toggleDialog"
      width="400px"
    >
      <el-form ref="modifyForm" :model="form" label-width="0px">
        <el-form-item
          prop="oldpass"
          :rules="[
          { required: true, message: '密码不能为空'},
          {max:16, message: '密码不超过16个字符'},
          {min:6, message: '密码最少6个字符'}
          ]"
        >
          <el-input placeholder="请输入旧密码" type="password" v-model.trim="form.oldpass"></el-input>
        </el-form-item>
        <el-form-item
          :rules="[
          {required: true, message: '密码不能为空'},
          {max:16, message: '密码不超过16个字符'},
          {min:6, message: '密码最少6个字符'},
          ]"
          prop="newpass"
        >
          <el-input placeholder="请输入新密码" type="password" v-model.trim="form.newpass"></el-input>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '密码不能为空'},{max:16, message: '密码不超过16个字符'},
          {min:6, message: '密码最少6个字符'}]"
          prop="repass"
        >
          <el-input placeholder="确认新密码" type="password" v-model.trim="form.repass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="toggleDialog">取 消</el-button>
        <el-button @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="ImgdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { setTimeout } from "timers";
import edit from "@/components/edit"

export default {
  name: "index",
  components: {
    edit
  },
  data() {
    return {
      defautlImg: [],
      dialogImageUrl: "",
      ImgdialogVisible: false,
      lincenseImg: "",
      fileList1: 0,
      switchVal: true,
      modifyAccont: false,
      userInfo: "",
      modifyPassShow: false,
      form: {
        oldpass: "",
        repass: "",
        newpass: ""
      },
      infoDetail: {
        abbreviation: "",
        contact: "",
        mobile: "",
        logoUrl: ""
      },
      templateShow:false,
      richText:''
    };
  },
  methods: {
    handleModifyTemplate(){
        this.templateShow=true
    },
    toggleDialog() {
      //切换前清空数据检测
      this.from = "";
      this.$refs["modifyForm"].resetFields();
      this.modifyPassShow = false;
    },
    handleSubmit() {
      this.$refs["modifyForm"].validate(valid => {
        if (valid) {
          let pwdReg = /^[\w_!@#-.]{6,16}$/;
          if (pwdReg.test(this.form.newpass)) {
            if (this.form.newpass == this.form.repass) {
              this.$http
                .post("/customer/updatePwd", {
                  newPwd: this.form.newpass,
                  oldPwd: this.form.oldpass,
                  userId: this.userInfo
                })
                .then(res => {
                  this.$notify({
                    title: "成功",
                    message: "密码修改成功",
                    type: "success"
                  });
                  this.modifyPassShow = false;
                });
            } else {
              this.$message({
                message: "两次输入的密码不匹配，请重试",
                type: "warning"
              });
            }
          } else {
            this.$message({
              message: "密码只能包含数字、字母、下划线，且长度为6~16位",
              type: "warning"
            });
          }
        } else {
          return false;
        }
      });
    },
    handleModifyAccont() {
      if (!this.modifyAccont) {
        this.modifyAccont = true;
        this.infoDetail = this.userInfo;
        this.$nextTick(() => {
          this.userInfo.logoUrl
            ? (this.defautlImg = [{ name: "img1", url: this.userInfo.logoUrl}])
            : (this.defautlImg = []);
          this.defautlImg.length
            ? (this.$refs.upload1.$children[1].$el.style.display = "none")
            : null;
            this.lincenseImg=this.userInfo.logoUrl
        });
      } else {
        this.$confirm("此操作将更新账号信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let regeAbbreviation = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
            let regeContant = new RegExp(/^[\u4e00-\u9fa5]{2,5}$/);
            let regeMobile = new RegExp(/^1\d{10}$/);
            console.log(this.lincenseImg)
            if (
              regeAbbreviation.test(this.infoDetail.abbreviation) &&
              regeContant.test(this.infoDetail.contact) &&
              regeMobile.test(this.infoDetail.mobile) &&
              this.lincenseImg
            ) {
              this.$http
                .post("customer/update", {
                  abbreviation: this.infoDetail.abbreviation,
                  contact: this.infoDetail.contact,
                  mobile: this.infoDetail.mobile,
                  logoUrl: this.lincenseImg,
                  id: this.userInfo.id,
                  operator: this.userInfo.id
                })
                .then(res => {
                  this.modifyAccont = false;
                  //更新token
                  this.$http.get(`customer/${this.userInfo.id}`).then(res => {
                    Cookie.set("userInfo", res.data);
                    this.userInfo.logoUrl = JSON.parse(
                      Cookie.get("userInfo")
                    ).logoUrl;
                    this.$message({
                      type: "success",
                      message: "操作成功!"
                    });
                  });
                });
            } else {
              this.$message({
                type: "warning",
                message: "表单必须按规则填写:企业简称为2到10个的汉字,企业联系人为2到5个的汉字,logo不能为空"
              });
            }
          })
          .catch(() => {
            this.modifyAccont = false;
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    handleRemove1(file, fileList) {
      this.$refs.upload1.$children[0].$el.style.display = "none";
      this.$refs.upload1.$children[1].$el.style.display = "flex";
       this.lincenseImg=''
    },
    handleSuccess1(response, file, fileList) {
      this.fileList1 = fileList.length;
      this.lincenseImg = response.data[0];
    },
    handleBefore1() {
      this.$refs.upload1.$children[1].$el.style.display = "none";
      this.$refs.upload1.$children[0].$el.style.display = "inline-block";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.ImgdialogVisible = true;
    },
    handleBeforeRemove() {}
  },
  mounted() {
    this.userInfo = Cookie.get("userInfo")
      ? JSON.parse(Cookie.get("userInfo"))
      : "";
    // this.userInfo.logoUrl?this.defautlImg.push({name:'img1',url:this.userInfo.logoUrl}):this.defautlImg=[]
  }
};
</script>

<style lang="less" scoped>
.title-modify {
  color: #3bc492;
  float: right;
  font-size: 14px;
  line-height: 27px;
  cursor: pointer;
}

.setting-index {
  background-color: rgba(243, 245, 247, 1);
  min-height: calc(100vh - 80px);
  padding-top: 32px;
  .setting-main > div {
    background-color: #fff;
    border-radius: 8px;
    padding: 42px 48px;
    h4 {
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(44, 45, 58, 1);
    }
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(44, 45, 58, 1);
      line-height: 36px;
      height: 36px;
    }
  }
  .setting-userInfo span {
    float: right;
    .el-input {
      width: 150px;
      height: 30px;
    }
  }
}
</style>
