@extends('main')

@section('content')
    <div id="Articles" style="padding-top: 2em">

        {{--EditField--}}
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

        {{--End of edit field--}}


        {{--</form>--}}

        {{--<div class="alert alert-success" transition="success" v-if="success">Add new user successful.</div>--}}
        {{--<hr>--}}
        <div v-if="!show && !edit">
            <h2>The list of articles</h2>
            <table class="table table-striped ">
                <thead class="thead-inverse">
                <th>#</th>
                <th>TITLE</th>
                <th>CONTENT</th>
                <th>CREATED_AT</th>
                <th>UPDATED_AT</th>
                <th style="width: 10em;">ACTION</th>
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
                        <button class="btn btn-danger btn-sm" @click="RemoveUser(user.id)">Remove</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="/js/main.js"></script>
@endpush

