<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 资源查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
           
            <el-table :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                
                  <el-table-column prop="ip" label="IP" width="105"></el-table-column>
                  <el-table-column prop="name" label="名称" width="105"></el-table-column>
                  <el-table-column prop="os" label="系统" width="105"> </el-table-column>
                  <el-table-column prop="config" label="配置"></el-table-column>
                  <!-- <el-table-column prop="ie" label="浏览器" width="55"></el-table-column> -->
                  <el-table-column prop="purpose" label="用途" width="105"></el-table-column>
                  <el-table-column prop="manager" label="管理员"></el-table-column>
                  <el-table-column prop="pos" label="位置"></el-table-column>
                  <el-table-column prop="user" label="用户密码" width="105" ></el-table-column>
                  <!-- <el-table-column prop="remarks" label="备注" width="35"></el-table-column> -->
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">         
                <el-form-item label="IP">
                    <el-input v-model="form.ip"></el-input>
                </el-form-item>
                  <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                  <el-form-item label="系统">
                    <el-input v-model="form.os"></el-input>
                </el-form-item>
                  <el-form-item label="配置">
                    <el-input v-model="form.config"></el-input>
                </el-form-item>
                  <el-form-item label="浏览器">
                    <el-input v-model="form.ie"></el-input>
                </el-form-item>
                  <el-form-item label="用途">
                    <el-input v-model="form.purpose"></el-input>
                </el-form-item>
                  <el-form-item label="管理员">
                    <el-input v-model="form.manager"></el-input>
                </el-form-item>
                  <el-form-item label="位置">
                    <el-input v-model="form.pos"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '/api/findAll',
                //tableData: [{ 'ip':'172.16.24.146','name':'高性能服务器','os':'Redhat6.5','config':'CPU E5-2650 v3 @ 2.30GHz  10核心20线程  64G','ie':'','purpose':'性能测试','manager':'赵元凯','pos':'机柜1','user':'root/000000','remarks':''}],
                tableData:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: true,
                editVisible: false,
                delVisible: false,
                form: {
                    ip:'',
                    name: '',
                    os : '',
                    config : '',
                    ie : '',
                    purpose : '',
                    manager :'',
                    pos : '',
                    user:'',
                    remarks :''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {

                return this.tableData;
                // return this.tableData.filter((d) => {
                //     let is_del = false;
                //     for (let i = 0; i < this.del_list.length; i++) {
                //         if (d.name === this.del_list[i].name) {
                //             is_del = true;
                //             break;
                //         }
                //     }
                //     if (!is_del) {
                //         if (d.address.indexOf(this.select_cate) > -1 &&
                //             (d.name.indexOf(this.select_word) > -1 ||
                //                 d.address.indexOf(this.select_word) > -1)
                //         ) {
                //             return d;
                //         }
                //     }
                // })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                console.log("cur_page===="+this.cur_page);
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    //this.url = '/ms/table/list';
                    this.url = '/api/findAll';
                    //console.log("development");
                };
                
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    
                    this.tableData = res.data.result;
                    //this.tableData = JSON.stringify(res.data.result);
                    //console.log("this.tableData===="+this.tableData);
                }).catch(error =>{
                    console.log("error===="+error);
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    ip: item.ip,
                    name: item.name,
                    os: item.os,
                    config : item.config,
                    ie : item.ie,
                    purpose : item.purpose,
                    manager :item.manager,
                    pos : item.pos,
                    user:item.user,
                    remarks :item.remarks
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
