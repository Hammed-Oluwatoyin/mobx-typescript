import {observable, makeObservable, computed} from 'mobx';
import RootStore from '../../root-store';

let runningId = 0;

export default class User {
    id:number;

    @observable
    name: string;

    private rootStore: RootStore;


    constructor(name: string, rootStore: RootStore) {
        this.id = runningId++;
        this.name = name;
        this.rootStore = rootStore;

        rootStore.dataStores.todoStore.addTodo('Finish The Course', this.id);

        makeObservable(this, {
            name:observable,
            todos: computed
        })
    }


    @computed
    get todos() {
        return this.rootStore.dataStores.todoStore.getUserTodos(this.id);
    }

    @computed
get completedTodos() {
    return this.todos.filter(todo => todo.isCompleted);
}

@computed
get inCompletedTodos() {
    return this.todos.filter(todo => !todo.isCompleted);
}
}