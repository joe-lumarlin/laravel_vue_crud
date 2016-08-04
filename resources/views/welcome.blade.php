@extends('main')

@section('content')
    <div id="Articles" style="padding-top: 2em">

        {{--ShowEditField--}}
        <div v-if="show">
            <h2 v-if="!edit">Show article № @{{ newArticle.id }}</h2>
            <h2 v-if="edit">Edit article № @{{ newArticle.id }}</h2>

            <button @click="back()" class="btn btn-default" id="backToList">Back to list</button>

            <form action="#" @submit.prevent="AddNewArticle" method="POST">
                <div class="alert alert-danger" v-if="!isValid">
                    <ul>
                        <li v-show="!validation.title">The title field is required.</li>
                        <li v-show="!validation.content">The content field is required.</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="title">TITLE:</label>
                    <input v-model="newArticle.title" @focus="toEdit()" type="text" id="title" name="title" class="form-control">
                </div>

                <div class="form-group">
                    <label for="content">CONTENT:</label>
                    <input v-model="newArticle.content" @focus="toEdit()" type="text" id="content" name="content" class="form-control">
                </div>
                <div class="form-group">

                    <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="
                    editArticle(newArticle.id)"
                    >Edit Article</button>
                </div>
            </form>
        </div>

        {{--End of ShowEdit field--}}

        {{--AddNew field--}}
        <div v-if="add || !isEmpty">
            <h2>Add new article</h2>

            <button @click="back()" class="btn btn-default" id="backToList">Back to list</button>

            <form action="#" @submit.prevent="addArticle()" method="POST">
                <div class="alert alert-danger" v-if="!isValid">
                    <ul>
                        <li v-show="!validation.title">The title field is required.</li>
                        <li v-show="!validation.content">The content field is required.</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="title">TITLE:</label>
                    <input v-model="newArticle.title" type="text" id="title" name="title" class="form-control">
                </div>

                <div class="form-group">
                    <label for="content">CONTENT:</label>
                    <input v-model="newArticle.content" type="text" id="content" name="content" class="form-control">
                </div>

                <div class="form-group">
                    <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="add">Add Article</button>
                </div>

            </form>

        </div>
        {{--The end of AddNew field--}}

        <div class="alert alert-success" transition="success" v-if="success">Add new article successful.</div>
        {{--<hr>--}}

        <div v-if="!show && !edit && !add && isEmpty">

            <h2>The list of articles</h2>
            <table class="table table-striped ">
                <thead class="thead-inverse">
                <th>#</th>
                <th>TITLE</th>
                <th>CONTENT</th>
                <th>CREATED_AT</th>
                <th>UPDATED_AT</th>
                <th style="width: 14em;">ACTION</th>
                </thead>

                <tbody>
                <tr v-for="article in articles">
                    <td>@{{ article.id }}</td>
                    <td>@{{ article.title}}</td>
                    <td>@{{ article.content }}</td>
                    <td>@{{ article.created_at }}</td>
                    <td>@{{ article.updated_at }}</td>
                    <td>
                        <button class="btn btn-default btn-sm" @click="showArticle(article.id)">Show</button>
                        <button class="btn btn-primary btn-sm" @click="createNewArticle()">Add</button>
                        <button class="btn btn-danger btn-sm" @click="removeArticle(article.id)">Remove</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <nav>
                <ul class="pagination">
                    <li v-if="pagination.current_page > 1">
                        <a href="#" aria-label="Previous"
                           @click.prevent="changePage(pagination.current_page - 1)">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li v-for="page in pagesNumber"
                        v-bind:class="[ page == isActived ? 'active' : '']">
                        <a href="#"
                           @click.prevent="changePage(page)">@{{ page }}</a>
                    </li>
                    <li v-if="pagination.current_page < pagination.last_page">
                        <a href="#" aria-label="Next"
                           @click.prevent="changePage(pagination.current_page + 1)">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
@endsection

@push('scripts')
    <script src="/js/main.js"></script>
@endpush

