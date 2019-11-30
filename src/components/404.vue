<script>
import { IsMobile } from '@/utils/auth.js';
export default {
    name: 'ErrorPage',
    beforeCreate () {
        const page404 = IsMobile() ? 'mobile' : 'web';
        window.location.href = `/static/404/${page404}/index.html`;
    }
};
</script>

