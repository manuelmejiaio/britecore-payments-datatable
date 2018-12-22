<template>
  <div>
    <TopNavigation
      :action-available="isActionsAvailable"
      :option-disabled="isOptionDisabled"
      @search="search($event)"
      @exportToXLS="exportToXLS()"
      @changeStatus="changeStatus($event)"
    />
    <div style="overflow-x:auto;">
      <table id="paymentsTable" ref="paymentsTable" border="1">
        <tr>
          <th></th>
          <th v-for="(title, index) in header" :key="index" class="filter">
            <input
              type="text"
              :id="index"
              :ref="index"
              @keyup="filterByColumn(index)"
              class="fa"
              :placeholder="'\uf0b0  Filter by ' + title"
            >
          </th>
        </tr>
        <tr>
          <th>
            <input type="checkbox" @click="checkAllPayments()">
          </th>
          <th
            v-for="(title, index) in header"
            :key="index"
            @click="sortByColumn(index+1)"
            class="header"
          >
            {{title}}
            <i class="fas fa-arrows-alt-v"></i>
          </th>
        </tr>
        <tr v-for="(payment,paymentIndex) in payments" :key="payment.ID">
          <td>
            <input type="checkbox" :value="paymentIndex" v-model="checkedPayments">
          </td>
          <td
            :contenteditable="key == 'Description'"
            v-for="(data,key) in payment"
            :key="data"
          >{{castData(data,key)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import paymentsData from '../../Data/paymentsData.json'
import XLSX from 'xlsx'
import { format } from 'date-fns'
import TopNavigation from '@/components/DataTable/TopNavigation'
export default {
  name: 'dataTable',
  components: {
    TopNavigation
  },
  data () {
    return {
      payments: paymentsData,
      header: Object.keys(paymentsData[0]),
      numericalColumn: 5, // column with numbers
      dateColumn: 4, // column with dates
      isAllPaymentsChecked: false,
      selectedPaymentIndex: 0,
      checkedPayments: []
    }
  },
  mounted () {
    this.sortByColumn(this.dateColumn) // order the data by date
  },
  computed: {
    isActionsAvailable () {
      return this.checkedPayments.length > 0
    },
    isOptionDisabled () {
      for (let index of this.checkedPayments) {
        if (this.payments[index].Status !== 'canceled' && this.payments[index].Status !== 'processed') {
          return false
        }
      }
      return true
    }
  },
  methods: {
    search (value) {
      let input = value.toUpperCase()
      let table = this.$refs.paymentsTable
      let tr = table.getElementsByTagName('tr')
      let found, td, row, column
      // Loop through all table rows (except the header and search)
      for (row = 2; row < tr.length; row++) {
        td = tr[row].getElementsByTagName('td')
        for (column = 0; column < td.length; column++) {
          if (td[column].innerHTML.toUpperCase().indexOf(input) > -1) {
            found = true
          }
        }
        if (found) {
          tr[row].style.display = ''
          found = false
        } else {
          tr[row].style.display = 'none'
        }
      }
    },
    filterByColumn (column) {
      let input = this.$refs[column][0].value.toUpperCase()
      let table = this.$refs.paymentsTable
      let tr = table.getElementsByTagName('tr')
      let td, txtValue
      // Loop through all table rows (except the header and search)
      for (let row = 2; row < tr.length; row++) {
        td = tr[row].getElementsByTagName('td')[column + 1]
        if (td) {
          txtValue = td.textContent || td.innerText
          if (txtValue.toUpperCase().indexOf(input) > -1) {
            tr[row].style.display = ''
          } else {
            tr[row].style.display = 'none'
          }
        }
      }
    },
    sortByColumn (column) {
      let table = this.$refs.paymentsTable
      let switching = true
      let shouldSwitch = false
      let switchcount = 0
      let direction = 'desc' // ascending and descending
      let currentRow, nextRow, index

      while (switching) {
        switching = false
        // Loop through all table rows (except the header and search)
        for (index = 2; index < (table.rows.length - 1); index++) {
          shouldSwitch = false
          currentRow = table.rows[index].getElementsByTagName('TD')[column]
          nextRow = table.rows[index + 1].getElementsByTagName('TD')[column]
          // check if it is a number.
          currentRow = column === this.numericalColumn ? Number(currentRow.innerHTML.substr(1)) : currentRow.innerHTML.toLowerCase()
          nextRow = column === this.numericalColumn ? Number(nextRow.innerHTML.substr(1)) : nextRow.innerHTML.toLowerCase()
          // switch rows based on the direction
          if (direction === 'desc') {
            if (currentRow < nextRow) {
              shouldSwitch = true
              break
            }
          } else if (direction === 'asc') {
            if (currentRow > nextRow) {
              shouldSwitch = true
              break
            }
          }
        }
        if (shouldSwitch) {
          table.rows[index].parentNode.insertBefore(table.rows[index + 1], table.rows[index])
          switching = true
          switchcount++
        } else {
          if (switchcount === 0 && direction === 'desc') {
            direction = 'asc'
            switching = true
          }
        }
      }
    },
    selectFilterType (title) {
      switch (title) {
        case 'Date':
          return 'date'
        case 'Amount':
          return 'number'
        default:
          return 'text'
      }
    },
    castData (data, key) {
      switch (key) {
        case 'Date':
          return format(data, 'YYYY-MM-DD MM:ss A')
        case 'Amount':
          return `$ ${data}`
        default:
          return data
      }
    },
    changeStatus (selectedOption) {
      for (let index of this.checkedPayments) {
        if (this.payments[index].Status !== 'canceled' && this.payments[index].Status !== 'processed') {
          this.payments[index].Status = selectedOption
        }
      }
    },
    checkAllPayments () {
      this.isAllPaymentsChecked = !this.isAllPaymentsChecked
      if (this.isAllPaymentsChecked) {
        this.checkedPayments = []
        const length = this.payments.length
        for (let index = 0; index < length; index++) {
          this.checkedPayments.push(index)
        }
      } else {
        this.checkedPayments = []
      }
    },
    savePayment (payment) {
      this.payments[this.selectedPaymentIndex] = payment
      this.isModalVisible = false
    },
    exportToXLS () {
      let paymentsToExport = []
      for (let index of this.checkedPayments) {
        paymentsToExport.push(this.payments[index])
      }

      let paymentsWS = XLSX.utils.json_to_sheet(paymentsToExport)
      var wb = XLSX.utils.book_new() // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, paymentsWS, 'Payments') // set worksheet name
      XLSX.writeFile(wb, 'BriteCore-payments.xlsx') // set workbook name AND export Excel file
    }
  }
}
</script>
<style lang="scss" scoped>
$main-color: #0191a9;
#paymentsTable {
  border-collapse: collapse;
  width: 100%;
  border: 2px solid $main-color;
}

#paymentsTable td,
#paymentsTable th {
  border: 1px solid #ddd;
  padding: 8px;
  cursor: pointer;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
.header:hover {
  background-color: #0197c1;
}
.filter {
  cursor: default !important;
}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: $main-color;
  color: white;
}
td:nth-child(1) {
  cursor: default !important;
  text-align: center;
  vertical-align: middle;
}

th input[type="text"] {
  width: 170px;
  font-size: 12px;
}
</style>
