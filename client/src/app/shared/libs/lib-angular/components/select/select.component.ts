import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {combineLatestWith, map, Observable, of, shareReplay, startWith} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'limber-select',
    standalone: true,
    imports: [
        NgxMatSelectSearchModule,
        MatFormField,
        MatLabel,
        MatSelect,
        ReactiveFormsModule,
        AsyncPipe,
        MatOption,
        MatProgressBar,
        FormsModule
    ],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {
    // FormControl que receberá o valor do campo
    @Input() control: FormControl;

    // Model que receberá o valor do campo
    @Input()
    set model(value: any) {
        if (value !== this._model) {
            this._model = value;
            this.modelChange.emit(this._model);
        }
    }
    get model() {
        return this._model;
    }

    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    // Adiciona um campo de texto para buscar um valor dentre as opções
    @Input() withFilter: boolean = true;

    // Campo que será filtrado
    @Input() optionsField: string;

    // Campo que passará o valor para o control. Se não informado, o select passará o valor do objeto inteiro para o control.
    @Input() valueField: string;

    // Observable do método de busca dos dados (não pode ser utilizado com o input "options")
    @Input() observable: Observable<any>;

    // Opções que aparecerão no select (não pode ser utilizado com o input "observable")
    @Input() options: any[];

    // Exibir opção nula
    @Input() showNullOption: boolean = false;

    // Nome do campo
    @Input() label: string;

    // Texto descritivo que aparecerá ao clicar sobre o campo.
    @Input() placeholder: string = "";

    // Texto descritivo que aparecerá na caixa de pesquisa
    @Input() searchPlaceholder: string = "";

    _model: any;
    public filter: FormControl<string>;
    public options$: Observable<any[]>;
    public filteredOptions$: Observable<any[]>;

    ngOnInit() {
        if (this.options) {
            this.observable = of<any[]>(this.options);
        }

        this.options$ = this.observable.pipe(
            map(response => {
                if (response instanceof HttpResponse) {
                    return response.body;
                }
                return response;
            }),
            shareReplay()
        );

        if (this.withFilter) {
            this.filter = new FormControl("");
            this.filteredOptions$ = this.filter.valueChanges.pipe(
                startWith(""),
                combineLatestWith(this.options$),
                map(([filter, options]) => {
                    return options.filter(option => option[this.optionsField].toLowerCase().includes(filter));
                })
            );
        }
    }
}
