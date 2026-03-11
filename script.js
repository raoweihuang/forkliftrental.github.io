let salesData = [];

function loadDataFromStorage() {
    const saved = localStorage.getItem('salesManagementData');
    if (saved) {
        salesData = JSON.parse(saved);
        renderTable();
        updateSummary();
    }
}

function saveDataToStorage() {
    localStorage.setItem('salesManagementData', JSON.stringify(salesData));
}

function renderTable(data = salesData) {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');

    if (data.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = data.map((item, index) => `
        <tr>
            <td>${item.contractNo}</td>
            <td>${item.customerName}</td>
            <td>${item.saleDate}</td>
            <td>${item.salesPerson}</td>
            <td><span class="status-badge status-active">${item.salesStage}</span></td>
            <td>${item.productName}</td>
            <td>${item.productModel || '-'}</td>
            <td>${item.quantity}</td>
            <td>${parseFloat(item.unitPrice).toLocaleString()}</td>
            <td>${parseFloat(item.totalAmount).toLocaleString()}</td>
            <td>${parseFloat(item.receivedAmount).toLocaleString()}</td>
            <td><span class="status-badge ${getPaymentStatusClass(item.paymentStatus)}">${item.paymentStatus}</span></td>
            <td>${item.warrantyStart || '-'}</td>
            <td>${item.warrantyEnd || '-'}</td>
            <td>${item.remarks || '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editRecord(${salesData.indexOf(item)})">编辑</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord(${salesData.indexOf(item)})">删除</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getPaymentStatusClass(status) {
    switch(status) {
        case '已收款': return 'status-active';
        case '部分收款': return 'status-pending';
        case '未收款': return 'status-cancelled';
        default: return '';
    }
}

function updateSummary() {
    const totalCount = salesData.length;
    const totalSales = salesData.reduce((sum, item) => sum + parseFloat(item.totalAmount || 0), 0);
    const totalReceivable = salesData.reduce((sum, item) => sum + parseFloat(item.receivableAmount || 0), 0);
    const totalReceived = salesData.reduce((sum, item) => sum + parseFloat(item.receivedAmount || 0), 0);

    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('totalSales').textContent = '¥' + totalSales.toLocaleString();
    document.getElementById('totalReceivable').textContent = '¥' + totalReceivable.toLocaleString();
    document.getElementById('totalReceived').textContent = '¥' + totalReceived.toLocaleString();
}

function openModal(isEdit = false) {
    document.getElementById('modal').classList.add('active');
    document.getElementById('modalTitle').textContent = isEdit ? '编辑销售记录' : '新增销售记录';
    
    if (!isEdit) {
        document.getElementById('salesForm').reset();
        document.getElementById('editIndex').value = '';
        document.getElementById('saleDate').valueAsDate = new Date();
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function saveForm() {
    const form = document.getElementById('salesForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const quantity = parseFloat(document.getElementById('quantity').value);
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const totalAmount = quantity * unitPrice;
    const receivedAmount = parseFloat(document.getElementById('receivedAmount').value) || 0;

    const record = {
        contractNo: document.getElementById('contractNo').value,
        customerName: document.getElementById('customerName').value,
        contactPerson: document.getElementById('contactPerson').value,
        contactPhone: document.getElementById('contactPhone').value,
        saleDate: document.getElementById('saleDate').value,
        salesPerson: document.getElementById('salesPerson').value,
        salesStage: document.getElementById('salesStage').value,
        contractAmount: document.getElementById('contractAmount').value,
        productName: document.getElementById('productName').value,
        productModel: document.getElementById('productModel').value,
        productCategory: document.getElementById('productCategory').value,
        quantity: quantity,
        unitPrice: unitPrice,
        deliveryDate: document.getElementById('deliveryDate').value,
        totalAmount: totalAmount,
        receivedAmount: receivedAmount,
        receivableAmount: totalAmount - receivedAmount,
        paymentMethod: document.getElementById('paymentMethod').value,
        paymentStatus: receivedAmount >= totalAmount ? '已收款' : (receivedAmount > 0 ? '部分收款' : '未收款'),
        invoiceType: document.getElementById('invoiceType').value,
        warrantyStart: document.getElementById('warrantyStart').value,
        warrantyEnd: document.getElementById('warrantyEnd').value,
        warrantyType: document.getElementById('warrantyType').value,
        warrantyContent: document.getElementById('warrantyContent').value,
        serviceLevel: document.getElementById('serviceLevel').value,
        projectSource: document.getElementById('projectSource').value,
        partner: document.getElementById('partner').value,
        remarks: document.getElementById('remarks').value,
        attachments: document.getElementById('attachments').value
    };

    const editIndex = document.getElementById('editIndex').value;
    if (editIndex !== '') {
        salesData[parseInt(editIndex)] = record;
    } else {
        salesData.push(record);
    }

    saveDataToStorage();
    renderTable();
    updateSummary();
    closeModal();
    alert('保存成功！');
}

function editRecord(index) {
    const item = salesData[index];
    document.getElementById('editIndex').value = index;
    document.getElementById('contractNo').value = item.contractNo;
    document.getElementById('customerName').value = item.customerName;
    document.getElementById('contactPerson').value = item.contactPerson || '';
    document.getElementById('contactPhone').value = item.contactPhone || '';
    document.getElementById('saleDate').value = item.saleDate;
    document.getElementById('salesPerson').value = item.salesPerson;
    document.getElementById('salesStage').value = item.salesStage;
    document.getElementById('contractAmount').value = item.contractAmount || '';
    document.getElementById('productName').value = item.productName;
    document.getElementById('productModel').value = item.productModel || '';
    document.getElementById('productCategory').value = item.productCategory;
    document.getElementById('quantity').value = item.quantity;
    document.getElementById('unitPrice').value = item.unitPrice;
    document.getElementById('deliveryDate').value = item.deliveryDate || '';
    document.getElementById('totalAmount').value = item.totalAmount;
    document.getElementById('receivedAmount').value = item.receivedAmount;
    document.getElementById('receivableAmount').value = item.receivableAmount;
    document.getElementById('paymentMethod').value = item.paymentMethod;
    document.getElementById('paymentStatus').value = item.paymentStatus;
    document.getElementById('invoiceType').value = item.invoiceType;
    document.getElementById('warrantyStart').value = item.warrantyStart || '';
    document.getElementById('warrantyEnd').value = item.warrantyEnd || '';
    document.getElementById('warrantyType').value = item.warrantyType;
    document.getElementById('warrantyContent').value = item.warrantyContent || '';
    document.getElementById('serviceLevel').value = item.serviceLevel;
    document.getElementById('projectSource').value = item.projectSource || '';
    document.getElementById('partner').value = item.partner || '';
    document.getElementById('remarks').value = item.remarks || '';
    document.getElementById('attachments').value = item.attachments || '';
    
    openModal(true);
}

function deleteRecord(index) {
    if (confirm('确定要删除这条记录吗？')) {
        salesData.splice(index, 1);
        saveDataToStorage();
        renderTable();
        updateSummary();
    }
}

function filterData() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filtered = salesData.filter(item => 
        item.contractNo.toLowerCase().includes(searchText) ||
        item.customerName.toLowerCase().includes(searchText) ||
        item.productName.toLowerCase().includes(searchText) ||
        item.salesPerson.toLowerCase().includes(searchText)
    );
    renderTable(filtered);
}

function saveData() {
    saveDataToStorage();
    alert('数据已成功保存到本地存储！');
}

function loadData() {
    const saved = localStorage.getItem('salesManagementData');
    if (saved) {
        salesData = JSON.parse(saved);
        renderTable();
        updateSummary();
        alert('数据已成功加载！');
    } else {
        alert('暂无保存的数据！');
    }
}

function exportData() {
    if (salesData.length === 0) {
        alert('没有数据可导出！');
        return;
    }

    const dataStr = JSON.stringify(salesData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '销售数据_' + new Date().toLocaleDateString().replace(/\//g, '-') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('数据已导出！');
}

function clearAllData() {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
        salesData = [];
        saveDataToStorage();
        renderTable();
        updateSummary();
        alert('数据已清空！');
    }
}

document.getElementById('quantity').addEventListener('change', calculateTotal);
document.getElementById('unitPrice').addEventListener('change', calculateTotal);

function calculateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value) || 0;
    const total = quantity * unitPrice;
    document.getElementById('totalAmount').value = total.toFixed(2);
    
    const receivedAmount = parseFloat(document.getElementById('receivedAmount').value) || 0;
    document.getElementById('receivableAmount').value = (total - receivedAmount).toFixed(2);
}

document.getElementById('receivedAmount').addEventListener('change', function() {
    const total = parseFloat(document.getElementById('totalAmount').value) || 0;
    const received = parseFloat(this.value) || 0;
    document.getElementById('receivableAmount').value = (total - received).toFixed(2);
});

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

loadDataFromStorage();