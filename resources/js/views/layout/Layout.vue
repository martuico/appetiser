<template>
    <div>
        <div class="main-container">
            <navbar/>
             <div class="container-fluid">
                <div class="row">
                    <!-- <sidebar/> -->
                    <app-main/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Navbar, AppMain, Sidebar} from './components'
export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    }
}
</script>
