export enum NuiEvent {
    SetVisible = 'setVisible',
}

export interface NuiEventData {
    [NuiEvent.SetVisible]: boolean;
}

export interface NuiMessageData<T extends NuiEvent> {
    event: T;
    data: NuiEventData[T];
}
