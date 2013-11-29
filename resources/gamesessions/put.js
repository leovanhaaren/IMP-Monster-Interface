
if(this.state == 'ended') {
    this.timeend = new Date().getTime();
    emit('session:end', this);
}
else if(this.state == 'cancelled') {
    this.timeend = new Date().getTime();
    emit('session:cancel', this);
}