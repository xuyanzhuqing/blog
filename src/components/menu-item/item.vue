<template>
  <div>
    <svg class="icon" aria-hidden="true" style="font-size: 20px">
        <use :xlink:href="'#' + data.icon"></use>
    </svg>
    <span>{{data.name}}</span>
  </div>
</template>
<script>
export default {
    name: 'treeMemu',
    props: {
        data: {
            required: false,
            type: Object,
            default: () => ({})
        }
    }
};
</script>
