<script lang="ts">
    import { onMount } from 'svelte';

    type Todo = {
        id: number;
        text: string;
        done: boolean;
    };

    let todos = $state<Todo[]>([]);
    let text = $state("");

    async function loadTodos() {
        const res = await fetch("/api/list");
        console.log("list api res: " + res);
        todos = await res.json();
        console.log("list api todos: " + todos);
    }

    onMount(() => {
        loadTodos();
    });


    async function createTodo() {
        if (!text) return;

        await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        text = "";
        await loadTodos();
    }

    async function deleteTodo(id: number) {
        await fetch("/api/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        await loadTodos();
    }

    async function editTodo(id: number, text: string) {
        await fetch("/api/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, text })
        });

        await loadTodos();
    }
</script>

<div class="max-w-md mx-auto mt-12 px-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-900">Todo</h1>

    <div class="flex gap-2 mb-6">
        <input
            bind:value={text}
            placeholder="todoを書く"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
        <button
            on:click={createTodo}
            class="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition cursor-pointer"
        >
            追加
        </button>
    </div>

    <ul class="flex flex-col gap-2">
        {#each todos as todo (todo.id)}
            <li class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <span class="text-gray-700">{todo.text}</span>
                <div class="flex gap-2">
                    <button
                        on:click={() => editTodo(todo.id, todo.text)}
                        class="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-lg hover:bg-indigo-200 transition cursor-pointer"
                    >
                        編集
                    </button>
                    <button
                        on:click={() => deleteTodo(todo.id)}
                        class="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition cursor-pointer"
                    >
                        削除
                    </button>
                </div>
            </li>
        {/each}
    </ul>
</div>