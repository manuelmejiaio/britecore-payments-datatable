<template>
  <div>
    <TopPanel/>
    <DataTable/>
  </div>
</template>

<script>
import TopPanel from '@/components/Shared/TopPanel'
import DataTable from '@/components/DataTable/DataTable'
export default {
  name: 'Home',
  components: {
    TopPanel,
    DataTable
  }
}
</script>
