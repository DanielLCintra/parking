<script>
export default {
  name: 'app'
}
</script>

<template>
  <div id="app">
        <div id="wrapper">
            <div id="sidebar-wrapper">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href="#">
                            Ortep
                        </a>
                    </li>
                    <li>
                        <router-link to="/" class="menu"><i class="fa fa-tachometer fa-lg" aria-hidden="true"></i> Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="clientes" class="menu"><i class="fa fa-user fa-lg" aria-hidden="true"></i> Clientes</router-link>
                    </li>
                    <li>
                        <router-link to="empresas" class="menu"><i class="fa fa-industry fa-lg" aria-hidden="true"></i> Empresas</router-link>
                    </li>
                    <li>
                        <router-link to="vagas" class="menu"><i class="fa fa-check fa-lg" aria-hidden="true"></i> Vagas</router-link>
                    </li>
                    <li>
                        <router-link to="veiculos" class="menu"><i class="fa fa-car fa-lg" aria-hidden="true"></i> Veículos</router-link>
                    </li>
                    <li>
                        <router-link to="pagamentos" class="menu"><i class="fa fa-money fa-lg" aria-hidden="true"></i> Pagamentos</router-link>
                    </li>
                </ul>
            </div>
            <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
            <div id="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                           <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /#page-content-wrapper -->
        </div>
        <div class="modal-footer">
            2017 © Ortep. Todos os direitos reservados.
        </div>
  </div>
</template>

<style>
  /*!
 * Start Bootstrap - Simple Sidebar HTML Template (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

/* Toggle Styles */

#wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

#wrapper.toggled {
    padding-left: 200px;
}

#sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 250px;
    width: 0;
    height: 100%;
    margin-left: -250px;
    overflow-y: auto;
    background: #000;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

#wrapper.toggled #sidebar-wrapper {
    width: 200px;
}

#page-content-wrapper {
    width: 100%;
    position: absolute;
    padding: 15px;
}

#wrapper.toggled #page-content-wrapper {
    position: absolute;
    margin-right: -250px;
}

/* Sidebar Styles */

.sidebar-nav {
    position: absolute;
    top: 0;
    width: 200px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-nav li {
    text-indent: 20px;
    line-height: 40px;
}

.sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: #999999;
}

.sidebar-nav li a:hover {
    text-decoration: none;
    color: #fff;
    background: rgba(255,255,255,0.2);
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
    text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
    height: 65px;
    font-size: 22px;
    font-family: Arial;
    line-height: 60px;
    margin-left: 55px;
    font-weight: bold;
}

.sidebar-nav > .sidebar-brand a {
    color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
    color: #fff;
    background: none;
}

@media(min-width:768px) {
    #wrapper {
        padding-left: 200px;
    }

    #wrapper.toggled {
        padding-left: 0;
    }

    #sidebar-wrapper {
        width: 200px;
    }

    #wrapper.toggled #sidebar-wrapper {
        width: 0;
    }

    #page-content-wrapper {
        padding: 20px;
        position: relative;
    }

    #wrapper.toggled #page-content-wrapper {
        position: relative;
        margin-right: 0;
    }
}
</style>