<template>
  <div style="-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none">


    <div class="main" id="jumbotron">

      <div class="container">
        <h1 class="logo cursive">CKFiT</h1>

        <div class="content">
          <h5 class="motto">하루 세번, 내 몸을 위한 시간</h5>
          <div class="subscribe">
            <div class="row">
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-fill"
                    @click.prevent="redirectToVideoList">지금 건강해지세요</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="container">
          <i class="fa fa-bolt bolt" style="color: #bfc74d"></i>&nbsp; &nbsp;<a
            href="https://github.com/suakang17/SSAFIT_" target='_blank'>Sua Kang &nbsp;Jichan Choi</a> <br>
          <i class="fa fa-github github"></i> &nbsp;Visit our &nbsp;<a href="https://github.com/suakang17/SSAFIT_"
            target='_blank'>Github</a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
// import '@/assets/css/landing-page.css';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LandingPage',
  setup() {
    const router = useRouter();
    const email = ref('');

    const notifyMe = () => {
    };

    const redirectToVideoList = () => {
      router.push('/video');
    };

    onMounted(() => {
    });

    return {
      email,
      notifyMe,
      redirectToVideoList,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/landing-page.css';

#jumbotron {
  margin: 0px auto;
  padding: 70px 30px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>