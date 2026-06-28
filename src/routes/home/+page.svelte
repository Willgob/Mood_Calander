<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        const ctx = document.getElementById('Graph');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
            {
            label: 'Mood',
            data: [3, 7, 10, 2, 5, 8, 4, 1, 9, 6, 3, 7],
            fill: false,
            borderColor: 'rgb(5, 1, 192)'
            },
            {
            label: 'Sleep',
            data: [6.8, 7.2, 5.9, 8.1, 7.5, 4.3, 6.7, 8.9, 5.4, 7.8, 6.1, 8.4],
            fill: false,
            borderColor: 'rgb(5, 124, 192)'
            },
            {
            label: 'Energy',
            data: [8, 5, 2, 9, 6, 1, 4, 7, 3, 10, 8, 5],
            fill: false,
            borderColor: 'rgb(5, 124,2)'
            },
            {
            label: 'Health',
            data: [9, 2, 5, 8, 3, 7, 1, 6, 10, 4, 8, 5],
            fill: false,
            borderColor: 'rgb(523, 124, 92)'
            }
            ]
        };

        // @ts-ignore
        const chart = new Chart(ctx, {
            type: 'line',
            data,
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                onClick: (event) => {
                    const xScale = chart.scales.x;

                    const left = xScale.left;
                    const right = xScale.right;

                    // @ts-ignore
                    const percent = (event.x - left) / (right - left);

                    const month = Math.floor(percent * data.labels.length);

                    console.log(data.labels[month]);
                    goto(`/${data.labels[month]}`);
                }
            }
        });
    });
</script>

<div>
  <canvas id="Graph"></canvas>
</div>