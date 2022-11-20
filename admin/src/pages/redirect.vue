<route lang="yaml">
meta:
  layout: blank
  hidden: true
  title: redirect
</route>

<script setup lang="ts">
const { params, query } = useRoute()
const { path } = params
const router = useRouter()
router.replace({ path: `/${path}`, query })
</script>

