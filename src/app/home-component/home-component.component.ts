import { ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../service/data.service';
import { ModalService } from '../modal/modal.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS,createEventId } from '../event-utils';
import Swal from 'sweetalert2';

interface Proyecto {
  Anio: number;
  Mes: string;
  Total: number;
}

interface Evento {
  Proyecto: string;
  Fecha_Final: any;
  Fecha_Inicio: any;
}

interface Estatus {
  Estatus: string;
  cantidad: number;
}

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit{
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'listWeek',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    //select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
    //eventsSet: this.handleEvents.bind(this)
  };
  currentEvents = signal<EventApi[]>([]);

  events: EventInput[] = [];

  even: any;


@ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[] = ['Cliente','Proyecto','Status','acciones'];
  dataSource: MatTableDataSource<any>;
  proyectosMes: any[] = [];
  proyectosEstatus:any[] = [];
 // Opciones de la gráfica
  legend: boolean = true;
  legendTitle: string = 'Mes';
  legendTitleE: string = 'Estatus';
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  xAxisLabelE: string = 'Estatus';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Cantidad';
  autoScale:boolean=true;

  constructor(private service: DataService,private modal:ModalService,private changeDetector: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  abrirModal(folio:number,cliente:string,proyecto:string,contacto:string,observaciones:string,fechaI:any,fechaF:any): void {
    const datos = {
      folio:folio,
      cliente: cliente,
      proyecto: proyecto,
      contacto: contacto,
      observaciones: observaciones,
      fechaI: fechaI,
      fechaF:fechaF
    };
    this.modal.setModalData(datos);
    this.modal.abrirModal();
  }

  get listaProyectos() {
    return  new MatTableDataSource(this.service.listaProyectos);
  }

  ngOnInit(): void {
    this.service.consultarProyectos().subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.events=data.data.map((item:Evento) => ({ title: item.Proyecto, start:this.formatDate(item.Fecha_Inicio),end:this.formatDate(item.Fecha_Final) }));
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });

    this.service.cantidadProyectos(2023).subscribe((data: any) => {
      this.proyectosMes = data.data.map((item:Proyecto) => ({ name: item.Mes, value: item.Total }));
    })

    this.service.cantidadProyectosEstatus().subscribe((data: any) => {
      this.proyectosEstatus = data.data.map((item: Estatus) => ({ name: item.Estatus, value: item.cantidad }));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

   handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
   }
  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire({
      icon: 'info',
      title: 'Proyecto',
      text: clickInfo.event.title
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
