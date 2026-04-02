// 云开发配置
const envConfig = {
  env: "raoweihuang-gzyuejiang-7afb0e2fb",
  region: "ap-shanghai"
};

let app, db;
let currentTab = "bus";

// 搜索
function doSearch() {
  refresh();
}

function getKeyword() {
  return document.getElementById("search").value.trim().toLowerCase();
}

// 刷新当前模块
function refresh() {
  if (!db) return;
  switch (currentTab) {
    case "bus": loadBusiness(); break;
    case "pro": loadProduct(); break;
    case "fin": loadFinance(); break;
    case "ren": loadRent(); break;
    case "mtn": loadMaintain(); break;
    case "otr": loadOther(); break;
  }
}

// ------------------------------
// 商务信息
// ------------------------------
async function saveBusiness() {
  if (!db) return alert("请等待SDK加载完成");
  const id = document.getElementById("bus_id").value;
  const data = {
    name: document.getElementById("bus_name").value,
    phone: document.getElementById("bus_phone").value,
    user: document.getElementById("bus_user").value,
    status: document.getElementById("bus_status").value,
    intent: document.getElementById("bus_intent").value,
    time: new Date()
  };
  try {
    if (id) {
      await db.collection("business").doc(id).update(data);
    } else {
      await db.collection("business").add(data);
    }
    alert("保存成功");
    resetBusiness();
    loadBusiness();
  } catch (e) {
    alert("保存失败：" + e.message);
  }
}

function resetBusiness() {
  document.getElementById("bus_id").value = "";
  document.getElementById("bus_name").value = "";
  document.getElementById("bus_phone").value = "";
  document.getElementById("bus_user").value = "";
  document.getElementById("bus_status").value = "";
  document.getElementById("bus_intent").value = "";
}

async function loadBusiness() {
  const kw = getKeyword();
  const res = await db.collection("business").orderBy("time", "desc").get();
  const list = res.data.filter(item => {
    const txt = (item.name || "") + (item.phone || "") + (item.user || "") + (item.status || "") + (item.intent || "");
    return txt.toLowerCase().includes(kw);
  });
  let html = `<tr><th>客户名称</th><th>联系电话</th><th>对接人</th><th>状态</th><th>意向</th><th>操作</th></tr>`;
  list.forEach(item => {
    html += `<tr>
      <td>${item.name || ""}</td>
      <td>${item.phone || ""}</td>
      <td>${item.user || ""}</td>
      <td>${item.status || ""}</td>
      <td>${item.intent || ""}</td>
      <td>
        <button class="btn-del" onclick="delBusiness('${item._id}')">删除</button>
      </td>
    </tr>`;
  });
  document.getElementById("bus_table").innerHTML = html;
}

async function editBusiness(id) {
  const doc = await db.collection("business").doc(id).get();
  const d = doc.data;
  document.getElementById("bus_id").value = id;
  document.getElementById("bus_name").value = d.name || "";
  document.getElementById("bus_phone").value = d.phone || "";
  document.getElementById("bus_user").value = d.user || "";
  document.getElementById("bus_status").value = d.status || "";
  document.getElementById("bus_intent").value = d.intent || "";
}

async function delBusiness(id) {
  if (!confirm("确定删除？")) return;
  try {
    await db.collection("business").doc(id).remove();
    loadBusiness();
  } catch (e) {
    alert("删除失败：" + e.message);
  }
}

// ------------------------------
// 库存信息
// ------------------------------
async function saveProduct() {
  if (!db) return alert("请等待SDK加载完成");
  const id = document.getElementById("pro_id").value;
  const data = {
    name: document.getElementById("pro_name").value,
    model: document.getElementById("pro_model").value,
    stock: document.getElementById("pro_stock").value,
    remark: document.getElementById("pro_remark").value,
    time: new Date()
  };
  try {
    id ? await db.collection("product").doc(id).update(data)
       : await db.collection("product").add(data);
    alert("保存成功");
    resetProduct();
    loadProduct();
  } catch (e) {
    alert("保存失败：" + e.message);
  }
}

function resetProduct() {
  document.getElementById("pro_id").value = "";
  document.getElementById("pro_name").value = "";
  document.getElementById("pro_model").value = "";
  document.getElementById("pro_stock").value = "";
  document.getElementById("pro_remark").value = "";
}

async function loadProduct() {
  const kw = getKeyword();
  const res = await db.collection("product").orderBy("time", "desc").get();
  const list = res.data.filter(item => {
    const txt = (item.name || "") + (item.model || "") + (item.remark || "");
    return txt.toLowerCase().includes(kw);
  });
  let html = `<tr><th>库存名称</th><th>型号规格</th><th>库存数量</th><th>备注</th><th>操作</th></tr>`;
  list.forEach(item => {
    html += `<tr>
      <td>${item.name || ""}</td>
      <td>${item.model || ""}</td>
      <td>${item.stock || ""}</td>
      <td>${item.remark || ""}</td>
      <td>
        <button class="btn-del" onclick="delProduct('${item._id}')">删除</button>
      </td>
    </tr>`;
  });
  document.getElementById("pro_table").innerHTML = html;
}

async function editProduct(id) {
  const doc = await db.collection("product").doc(id).get();
  const d = doc.data;
  document.getElementById("pro_id").value = id;
  document.getElementById("pro_name").value = d.name || "";
  document.getElementById("pro_model").value = d.model || "";
  document.getElementById("pro_stock").value = d.stock || "";
  document.getElementById("pro_remark").value = d.remark || "";
}

async function delProduct(id) {
  if (!confirm("确定删除？")) return;
  try {
    await db.collection("product").doc(id).remove();
    loadProduct();
  } catch (e) {
    alert("删除失败：" + e.message);
  }
}
// ------------------------------
// 销售财务
// ------------------------------
async function saveFinance() {
  if (!db) return alert("请等待SDK加载完成");
  const id = document.getElementById("fin_id").value;
  const data = {
    contract: document.getElementById("fin_contract").value,
    name: document.getElementById("fin_name").value,
    money: document.getElementById("fin_money").value,
    status: document.getElementById("fin_status").value,
    date: document.getElementById("fin_date").value,
    remark: document.getElementById("fin_remark").value,
    time: new Date()
  };
  try {
    id ? await db.collection("finance").doc(id).update(data)
       : await db.collection("finance").add(data);
    alert("保存成功");
    resetFinance();
    loadFinance();
  } catch (e) {
    alert("保存失败：" + e.message);
  }
}

function resetFinance() {
  document.getElementById("fin_id").value = "";
  document.getElementById("fin_contract").value = "";
  document.getElementById("fin_name").value = "";
  document.getElementById("fin_money").value = "";
  document.getElementById("fin_status").value = "";
  document.getElementById("fin_date").value = "";
  document.getElementById("fin_remark").value = "";
}

async function loadFinance() {
  const kw = getKeyword();
  const res = await db.collection("finance").orderBy("time", "desc").get();
  const list = res.data.filter(item => {
    const txt = (item.contract || "") + (item.name || "") + (item.status || "");
    return txt.toLowerCase().includes(kw);
  });

  const total = list.reduce((s, i) => s + Number(i.money || 0), 0);
  const received = list.filter(i => (i.status || "").includes("已收")).reduce((s, i) => s + Number(i.money || 0), 0);

  document.getElementById("fin_total").innerText = total.toFixed(2);
  document.getElementById("fin_ok").innerText = received.toFixed(2);

  let html = `<tr><th>合同编号</th><th>客户</th><th>金额</th><th>状态</th><th>日期</th><th>备注</th><th>操作</th></tr>`;
  list.forEach(item => {
    html += `<tr>
      <td>${item.contract || ""}</td>
      <td>${item.name || ""}</td>
      <td>${item.money || ""}</td>
      <td>${item.status || ""}</td>
      <td>${item.date || ""}</td>
      <td>${item.remark || ""}</td>
      <td>
        <button class="btn-del" onclick="delFinance('${item._id}')">删除</button>
      </td>
    </tr>`;
  });
  document.getElementById("fin_table").innerHTML = html;
}

async function editFinance(id) {
  const doc = await db.collection("finance").doc(id).get();
  const d = doc.data;
  document.getElementById("fin_id").value = id;
  document.getElementById("fin_contract").value = d.contract || "";
  document.getElementById("fin_name").value = d.name || "";
  document.getElementById("fin_money").value = d.money || "";
  document.getElementById("fin_status").value = d.status || "";
  document.getElementById("fin_date").value = d.date || "";
  document.getElementById("fin_remark").value = d.remark || "";
}

async function delFinance(id) {
  if (!confirm("确定删除？")) return;
  try {
    await db.collection("finance").doc(id).remove();
    loadFinance();
  } catch (e) {
    alert("删除失败：" + e.message);
  }
}

// ------------------------------
// 租赁财务
// ------------------------------
async function saveRent() {
  if (!db) return alert("请等待SDK加载完成");
  const id = document.getElementById("ren_id").value;
  const data = {
    contract: document.getElementById("ren_contract").value,
    name: document.getElementById("ren_name").value,
    total: document.getElementById("ren_total_money").value,
    rent: document.getElementById("ren_rent").value,
    period: document.getElementById("ren_period").value,
    status: document.getElementById("ren_status").value,
    startDate: document.getElementById("ren_start").value,
    endDate: document.getElementById("ren_end").value,
    remark: document.getElementById("ren_remark").value,
    time: new Date()
  };
  try {
    id ? await db.collection("rent_finance").doc(id).update(data)
       : await db.collection("rent_finance").add(data);
    alert("保存成功");
    resetRent();
    loadRent();
  } catch (e) {
    alert("保存失败：" + e.message);
  }
}

function resetRent() {
  document.getElementById("ren_id").value = "";
  document.getElementById("ren_contract").value = "";
  document.getElementById("ren_name").value = "";
  document.getElementById("ren_total_money").value = "";
  document.getElementById("ren_rent").value = "";
  document.getElementById("ren_period").value = "";
  document.getElementById("ren_status").value = "";
  document.getElementById("ren_start").value = "";
  document.getElementById("ren_end").value = "";
  document.getElementById("ren_remark").value = "";
}

async function loadRent() {
  const kw = getKeyword();
  const res = await db.collection("rent_finance").orderBy("time", "desc").get();
  const list = res.data.filter(item => {
    const txt = (item.contract || "") + (item.name || "") + (item.status || "") + (item.remark || "");
    return txt.toLowerCase().includes(kw);
  });

  const totalAmt = list.reduce((s, i) => s + Number(i.total || 0), 0);
  const rentAmt = list.reduce((s, i) => s + Number(i.rent || 0), 0);

  document.getElementById("ren_total_all").innerText = totalAmt.toFixed(2);
  document.getElementById("ren_rent_all").innerText = rentAmt.toFixed(2);

  let html = `<tr>
    <th>合同编号</th>
    <th>客户名称</th>
    <th>总金额</th>
    <th>租金</th>
    <th>租赁期数</th>
    <th>收款状态</th>
    <th>起租日</th>
    <th>止租日</th>
    <th>备注</th>
    <th>操作</th>
  </tr>`;

  list.forEach(item => {
    html += `<tr>
      <td>${item.contract || ""}</td>
      <td>${item.name || ""}</td>
      <td>${item.total || ""}</td>
      <td>${item.rent || ""}</td>
      <td>${item.period || ""}</td>
      <td>${item.status || ""}</td>
      <td>${item.startDate || ""}</td>
      <td>${item.endDate || ""}</td>
      <td>${item.remark || ""}</td>
      <td>
        <button class="btn-del" onclick="delRent('${item._id}')">删除</button>
      </td>
    </tr>`;
  });

  document.getElementById("ren_table").innerHTML = html;
}

async function editRent(id) {
  const doc = await db.collection("rent_finance").doc(id).get();
  const d = doc.data;
  document.getElementById("ren_id").value = id;
  document.getElementById("ren_contract").value = d.contract || "";
  document.getElementById("ren_name").value = d.name || "";
  document.getElementById("ren_total_money").value = d.total || "";
  document.getElementById("ren_rent").value = d.rent || "";
  document.getElementById("ren_period").value = d.period || "";
  document.getElementById("ren_status").value = d.status || "";
  document.getElementById("ren_start").value = d.startDate || "";
  document.getElementById("ren_end").value = d.endDate || "";
  document.getElementById("ren_remark").value = d.remark || "";
}

async function delRent(id) {
  if (!confirm("确定删除这条租赁记录？")) return;
  try {
    await db.collection("rent_finance").doc(id).remove();
    loadRent();
  } catch (e) {
    alert("删除失败：" + e.message);
  }
}

// ------------------------------
// 维保信息
// ------------------------------
async function saveMaintain() {
  if (!db) return alert("请等待SDK加载完成");
  const id = document.getElementById("mtn_id").value;
  const data = {
    contract: document.getElementById("mtn_contract").value,
    device: document.getElementById("mtn_device").value,
    name: document.getElementById("mtn_name").value,
    date: document.getElementById("mtn_date").value,
    user: document.getElementById("mtn_user").value,
    content: document.getElementById("mtn_content").value,
    time: new Date()
  };
  try {
    id ? await db.collection("maintain").doc(id).update(data)
       : await db.collection("maintain").add(data);
    alert("保存成功");
    resetMaintain();
    loadMaintain();
  } catch (e) {
    alert("保存失败：" + e.message);
  }
}

function resetMaintain() {
  document.getElementById("mtn_id").value = "";
  document.getElementById("mtn_contract").value = "";
  document.getElementById("mtn_device").value = "";
  document.getElementById("mtn_name").value = "";
  document.getElementById("mtn_date").value = "";
  document.getElementById("mtn_user").value = "";
  document.getElementById("mtn_content").value = "";
}

async function loadMaintain() {
  const kw = getKeyword();
  const res = await db.collection("maintain").orderBy("time", "desc").get();
  const list = res.data.filter(item => {
    const txt = (item.contract || "") + (item.device || "") + (item.name || "") + (item.content || "");
    return txt.toLowerCase().includes(kw);
  });
  let html = `<tr><th>合同编号</th><th>车辆型号</th><th>客户</th><th>维保日期</th><th>负责人</th><th>维保内容</th><th>操作</th></tr>`;
  list.forEach(item => {
    html += `<tr>
      <td>${item.contract || ""}</td>
      <td>${item.device || ""}</td>
      <td>${item.name || ""}</td>
      <td>${item.date || ""}</td>
      <td>${item.user || ""}</td>
      <td>${item.content || ""}</td>
      <td>
        <button class="btn-del" onclick="delMaintain('${item._id}')">删除</button>
      </td>
    </tr>`;
  });
  document.getElementById("mtn_table").innerHTML = html;
}

async function editMaintain(id) {
  const doc = await db.collection("maintain").doc(id).get();
  const d = doc.data;
  document.getElementById("mtn_id").value = id;
  document.getElementById("mtn_contract").value = d.contract || "";
  document.getElementById("mtn_device").value = d.device || "";
  document.getElementById("mtn_name").value = d.name || "";
  document.getElementById("mtn_date").value = d.date || "";
  document.getElementById("mtn_user").value = d.user || "";
  document.getElementById("mtn_content").value = d.content || "";
}

async function delMaintain(id) {
  if (!confirm("确定删除？")) return;
  try {
    await db.collection("maintain").doc(id).remove();
    loadMaintain();
  } catch (e) {
    alert("删除失败：" + e.message);
  }
}

// ------------------------------
// 其他信息
// ------------------------------
async function saveOther() {
  if (!db) return alert("请等待SDK加载完成");
  const id = document.getElementById("otr_id").value;
  const data = {
    title: document.getElementById("otr_title").value,
    content: document.getElementById("otr_content").value,
    time: new Date()
  };
  try {
    id ? await db.collection("other").doc(id).update(data)
       : await db.collection("other").add(data);
    alert("保存成功");
    resetOther();
    loadOther();
  } catch (e) {
    alert("保存失败：" + e.message);
  }
}

function resetOther() {
  document.getElementById("otr_id").value = "";
  document.getElementById("otr_title").value = "";
  document.getElementById("otr_content").value = "";
}

async function loadOther() {
  const kw = getKeyword();
  const res = await db.collection("other").orderBy("time", "desc").get();
  const list = res.data.filter(item => {
    const txt = (item.title || "") + (item.content || "");
    return txt.toLowerCase().includes(kw);
  });
  let html = `<tr><th>标题</th><th>内容</th><th>操作</th></tr>`;
  list.forEach(item => {
    html += `<tr>
      <td>${item.title || ""}</td>
      <td>${item.content || ""}</td>
      <td>
        <button class="btn-del" onclick="delOther('${item._id}')">删除</button>
      </td>
    </tr>`;
  });
  document.getElementById("otr_table").innerHTML = html;
}

async function editOther(id) {
  const doc = await db.collection("other").doc(id).get();
  const d = doc.data;
  document.getElementById("otr_id").value = id;
  document.getElementById("otr_title").value = d.title || "";
  document.getElementById("otr_content").value = d.content || "";
}

async function delOther(id) {
  if (!confirm("确定删除？")) return;
  try {
    await db.collection("other").doc(id).remove();
    loadOther();
  } catch (e) {
    alert("删除失败：" + e.message);
  }
}

// ------------------------------
// 初始化
// ------------------------------
window.onload = async function () {
  if (!window.cloudbase) {
    document.getElementById("sdkError").style.display = "block";
    return;
  }

  try {
    app = cloudbase.init(envConfig);
    db = app.database();
    await app.auth().anonymousAuthProvider().signIn();

    document.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".section").forEach(s => s.classList.remove("show"));
        tab.classList.add("active");
        const target = tab.dataset.target;
        document.getElementById(target).classList.add("show");
        currentTab = target;
        refresh();
      });
    });

    refresh();
  } catch (e) {
    alert("初始化失败：" + e.message);
  }
};