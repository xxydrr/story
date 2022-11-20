<script setup lang="ts">
const { params, query } = useRoute()
const { path } = params
const router = useRouter()
router.replace({ path: `/${path}`, query })
</script>

