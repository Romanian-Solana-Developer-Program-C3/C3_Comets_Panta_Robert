// TODO: Add the missing type of the argument `num` after the colon `:`.
fn call_me(num: i32) { // Specify the type of num as i32
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}

fn main() {
    call_me(3);
}

/*/
// TODO: Add the missing type of the argument `num` after the colon `:`.
fn call_me(num:) {
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}

fn main() {
    call_me(3);
}
*/