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
          <span>修改信息</span>
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
            prop="mobile"
            :rules="[
          { required: true, message: '请输入手机号码', trigger: 'change' },
          {pattern:/^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'change'},
          ]"
          >
            <el-input placeholder="企业联系手机" v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="upload-container">
              <span>上传营业执照</span>
              <el-upload
                ref="upload1"
                :action="`${$http.defaults.img_url}/pst_service_file/file/uploadImg`"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="handleBefore1"
                :on-success="handleSuccess1"
                :on-remove="handleRemove1"
                :file-list="defautlImg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button class="login-btn" :loading="loading" type="primary" @click="handleReg">确 定 修 改</el-button>
        </div>
      </div>
    </el-col>
    <el-dialog :visible.sync="ImgdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { constants } from "crypto";
import { fail } from "assert";
import Cookie from 'js-cookie'

export default {
  name: "about",
  components: {},
  data() {
    return {
        defautlImg:[],
      loading: false,
      imgSrc: "",
      dialogImageUrl: "",
      ImgdialogVisible: false,
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
        if (valid) {
            if (this.lincenseImg) {
              this.loading = true;
              let data={
                  customerName: this.form.customerName,
                  licenseUrl: this.lincenseImg,
                  mobile: this.form.mobile,
                  id:this.form.id,
                  operator:this.form.id,
              }
              this.$http
                .post("customer/update", data)
                .then(res => {
                  console.log(res.data);
                  this.$notify({
                    title: "成功",
                    message: "修改成功，请等待管理员审核",
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
                message: "请上传营业执照",
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
      this.$refs.upload1.$children[0].$el.style.display = "none";
      this.$refs.upload1.$children[1].$el.style.display = "flex";
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.fileList1 = fileList.length;
      this.logoImg = response.data[0];
    },
    handleBefore() {
      this.$refs.upload1.$children[1].$el.style.display = "none";
      this.$refs.upload1.$children[0].$el.style.display = "inline-block";
    },
    //
    handleRemove1(file, fileList) {
      this.$refs.upload1.$children[0].$el.style.display = "none";
      this.$refs.upload1.$children[1].$el.style.display = "flex";
    },
    handleSuccess1(response, file, fileList) {
      this.fileList1 = fileList.length;
      this.lincenseImg = response.data[0];
      console.log(this.lincenseImg)
    },
    handleBefore1() {
      this.$refs.upload1.$children[1].$el.style.display = "none";
      this.$refs.upload1.$children[0].$el.style.display = "inline-block";
    },
    
  },
  mounted(){
     console.log(JSON.parse(Cookie.get('userInfo'))) 
     this.form =JSON.parse(Cookie.get('userInfo'))
     console.log(this.form.licenseUrl)
     this.$nextTick(()=>{
        this.defautlImg = [{ name: "img1", url: this.form.licenseUrl}]
        this.$refs.upload1.$children[1].$el.style.display = "none"
         console.log(this.$refs.upload1.$children[1].$el.style.display)
     })
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
